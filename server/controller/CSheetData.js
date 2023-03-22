const { sequelize } = require('../model');
const { Op } = require('sequelize');
const { User, Sheet, DBhub, Info } = require('../model');
//가계부 정보 불러오기
exports.getsheetdata = async (req, res) => {
  console.log(req.query);
  //현재 연도 구하기
  let today = new Date();
  let nowYear = today.getFullYear();

  ///데이터 정제 함수
  function makeData(findData) {
    //결과 배열 정리하기
    let arrData = [];
    let months = [];
    findData.forEach((element) => {
      const { input_date, ...otherdata } = element.dataValues;
      otherdata.month = element.dataValues.input_date.split('-')[1];
      arrData.push(otherdata);
      months.includes(element.dataValues.input_date.split('-')[1])
        ? months
        : months.push(element.dataValues.input_date.split('-')[1]);
    });

    // 같은 키값 합치기
    const dataValues = arrData.reduce((acc, cur) => {
      acc[cur.month] = acc[cur.month] || [];
      acc[cur.month].push(cur.money);
      return acc;
    }, {});

    const add = function (arr) {
      return arr.reduce((a, b) => a + b, 0);
    };

    const result = Object.keys(dataValues).map((key) => {
      return {
        x: key,
        y: add(dataValues[key]),
      };
    });

    console.log(result);
    return result;
  }

  try {
    //수입
    let findIncome = await Info.findAll({
      order: [['input_date', 'ASC']],
      attributes: ['input_date', 'money'],
      where: {
        [Op.and]: [
          { sheet_id: req.query.sheet_id },
          { type: 1 },
          sequelize.where(
            sequelize.fn('YEAR', sequelize.col('input_date')),
            nowYear
          ),
        ],
      },
    });
    console.log('findIncomeData:', findIncome);

    //지출
    let findSpend = await Info.findAll({
      order: [['input_date', 'ASC']],
      attributes: ['input_date', 'money'],
      where: {
        [Op.and]: [
          { sheet_id: req.query.sheet_id },
          { type: 2 },
          sequelize.where(
            sequelize.fn('YEAR', sequelize.col('input_date')),
            nowYear
          ),
        ],
      },
    });
    console.log('findSpendData:', findSpend);

    //필요한 데이터 추출
    const income = makeData(findIncome);
    const spend = makeData(findSpend);
    console.log(income);
    res.status(200).send({ incomeArr: income, spendArr: spend });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: '차트 정보를 불러오는 데 실패했습니다.' });
  }
};

//가계부 공유하기
exports.shareSheet = async (req, res) => {
  try {
    DBhub.update(
      { guest: req.body.guest, auth: 2 },
      {
        where: {
          user_email: req.decoded.user_email,
          sheet_id: req.body.sheet_id,
        },
      }
    );
    res.status(200).json({
      msg: '초대 완료!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: '가계부 공유하기 도중 오류가 발생했습니다. 다시 시도해주세요.',
    });
  }
};

//초대 승인, 거절 버튼
exports.inviteApproval = async (req, res) => {
  console.log(req.body);
  console.log('dddd', req.decoded);
  const userEmail = req.decoded.user_email;
  //거절일 경우 = approve값이 false일 경우
  //DBhub의 guest컬럼이 내 이메일이고 해당 가계부인 행을 삭제
  try {
    console.log('dd' + req.decoded.user_email);
    console.log(req.body.approval);
    if (req.body.approval === 'N') {
      await DBhub.update(
        { guest: null },
        {
          where: {
            guest: req.decoded.user_email,
            sheet_id: req.body.sheet_id,
          },
        }
      );
    } else {
      await DBhub.update(
        { auth: 1 },
        {
          where: {
            guest: req.decoded.user_email,
            sheet_id: req.body.sheet_id,
          },
        }
      );
    }
    res.status(200).json({
      msg: '응답 완료',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: '초대 승인/거절 처리 중 오류발생',
    });
  }
};

exports.getcalendardata = async (req, res) => {
  try {
    const calendar = await Info.findAll({
      raw: true,
      attributes: [
        'info_id',
        'input_date',
        'type',
        'money',
        'category',
        'memo',
      ],
      where: { sheet_id: req.query.sheet_id },
    });
    console.log(calendar);

    res.status(200).json({
      calendar,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: '데이터가 없습니다.',
    });
  }
};
