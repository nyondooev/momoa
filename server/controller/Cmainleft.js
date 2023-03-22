const { sequelize } = require('../model');
const { Op } = require('sequelize');
const { User, Sheet, DBhub, Info } = require('../model');

// const userDatabase = require('../model/Database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// //sheet_id에 해당하는 모든 정보 불러오는
// exports.get_main = async (req, res) => {
//   let result = await Info.findAll({
//     attributes: ['type', 'input_date', 'money'],
//     // where: { type: req.query.type },
//   });
//   res.send(result);
// };

//1. 로그인 성공후 가계부 페이지 나올때 DBhub에서 user_email을 찾아서 user의 정보를 가져오고,sheet_id를 기준으로 sheet테이블에서 sheet_name,sheet id를 가져오는 get요청  //
//get  '/getsheetid',

exports.get_sheetid = async (req, res) => {
  console.log(req.decoded);
  const user_email = req.decoded.user_email;
  const user_name = req.decoded.user_name;
  console.log(user_email);

  try {
    const sheet_share = await Sheet.findAll({
      attributes: ['sheet_name', 'sheet_id', 'DBhubs.sheet_id'],
      raw: true,

      include: [
        {
          model: DBhub,
          required: true,
          attributes: [],
          where: {
            guest: user_email,
            auth: 1,
          },
        },
      ],
    });

    const sheet = await Sheet.findAll({
      attributes: ['sheet_name', 'sheet_id', 'DBhubs.sheet_id'],
      raw: true,
      include: [
        {
          model: DBhub,
          required: true,
          attributes: [],
          where: {
            user_email,
            [Op.or]: [{ auth: 1 }, { auth: 0 }],
          },
        },
      ],
    });

    // const user = await User.findOne({
    //   where: {
    //     user_email: user_email,
    //   },
    //   include: {
    //     model: DBhub,
    //     attributes: ['sheet_id'],
    //     include: {
    //       model: Sheet,
    //       attributes: ['sheet_name'],
    //     },
    //   },
    //   attributes: ['user_email'],
    // });

    res.status(200).json({
      sheet,
      sheet_share,
      user_name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};

//2. 마이페이지에서 get 요청 (1.초대알림여부를 확인auto값으로 2..sheet name,sheet idsheet,creater, //유저테이블하고 db허브)

exports.get_personalinfo = async (req, res) => {
  console.log(req.decoded);
  const user_email = req.decoded.user_email;
  const user_name = req.decoded.user_name;
  console.log(user_email);

  try {
    //creator의 이름은 나를 초대한사람의 이름이지만 guest의 이름이 내이름인, 즉 내가 초대받은 가계부 중에서 내가 수락누른것 auth값1
    const sheet_share = await Sheet.findAll({
      attributes: ['sheet_name', 'sheet_id'],
      raw: true,

      include: [
        {
          model: DBhub,
          required: true,
          attributes: [],
          where: {
            guest: user_email,
            auth: 1,
          },
        },
      ],
    });

    const sheet = await Sheet.findAll({
      //내가 만든가계부(user_email이 내 email인것들 중에서 기본으로 생성된 나만의 가계부: auth값이 0, 내가 만든 가계부중에서 내가 다른사람을 초대해서 수락을 받아 auth값이 1이된 가계부)
      attributes: ['sheet_name', 'sheet_id'],
      raw: true,
      include: [
        {
          model: DBhub,
          required: true,
          attributes: [],
          where: {
            user_email,
            [Op.or]: [{ auth: 1 }, { auth: 0 }],
          },
        },
      ],
    });

    const sheet_before_accept = await Sheet.findAll({
      attributes: ['sheet_name', 'sheet_id', 'creator'],
      raw: true,
      include: [
        {
          model: DBhub,
          required: true,
          attributes: [],
          where: {
            guest: user_email,
            auth: 2,
          },
        },
      ],
    });

    res.status(200).json({
      sheet_share,
      user_name,
      user_email,
      sheet,
      sheet_before_accept,
      // sheet_before_accept: sheet_before_accept.map((sheet) => ({
      //   ...sheet,
      //   guest: sheet['DBhubs.guest'],
      // })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};

//수입지출 등등 입력하는

//4. 수입지출 등등 입력하는   post '/writeinfo'

exports.write_info = (req, res) => {
  try {
    let data = {
      sheet_id: req.body.sheet_id,
      input_date: req.body.input_date,
      type: req.body.type,
      money: req.body.money,
      category: req.body.category,
      memo: req.body.memo,
    };

    Info.create(data).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};

exports.write_goal = (req, res) => {
  Sheet.update(
    { goal: req.body.goal },
    { where: { sheet_id: req.body.sheet_id } }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

//6. 초대받으면 auth값을  t로 update하는 초대버튼 api

//7. 거절하면 auth값을 날려버리는 api

//8. 초대 하면 유저값을 반환해주는 api     get(/getUserByEmail)

// exports.getUserByEmail = async (req, res) => {
//   // const user_email = req.decoded.user_email;

//   try {
//     const { user_email } = req.params;
//     const user = await User.findOne({
//       where: { user_email },
//       attributes: ['user_email', 'user_name'],
//     });

//     if (!user) {
//       return res.status(404).json({ message: '유저가 없습니다' });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: '서버 에러 ' });
//   }
// };

//9. 초대 버튼을 누르면 auth를 2로 create해주는 api

//10. sheet문서 만들기 api   post /createSheet

const { v4: uuidv4 } = require('uuid');

exports.createSheet = async (req, res) => {
  const user_email = req.decoded.user_email;
  const user_name = req.decoded.user_name;
  const { sheet_name } = req.body;

  try {
    const sheet_id = uuidv4(); // sheet_id 값 생성

    const sheet = await Sheet.create({
      sheet_name,
      // creator,
      creator: req.decoded.user_email,
      goal: null,
      sheet_id, // 생성한 sheet_id 값 전달
    });

    await DBhub.create({
      user_email,
      auth: 0,
      guest: null,
      sheet_id,
    });

    return res.status(201).json({
      success: true,
      message: '문서가 성공적으로 생성되었습니다',
      sheet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: '문서 생성에 실패했습니다',
      error: error.message,
    });
  }
};

exports.get_goal = async (req, res) => {
  let today = new Date();
  let nowMonth = today.getMonth();

  const add = function (arr) {
    return arr.reduce((a, b) => a + b, 0);
  };

  try {
    const now = await Info.findAll({
      raw: true,
      attributes: ['money'],
      where: {
        [Op.and]: [
          { type: 2 },
          { sheet_id: req.query.sheet_id },
          sequelize.where(
            sequelize.fn('MONTH', sequelize.col('input_date')),
            nowMonth + 1
          ),
        ],
      },
    });

    const nowSpendArr = [];
    now.forEach((el) => {
      nowSpendArr.push(el.money);
    });

    const addSpend = add(nowSpendArr);
    console.log(addSpend);

    const test = await Sheet.findOne({
      raw: true,
      attributes: ['goal'],
      where: { sheet_id: req.query.sheet_id },
    });

    res.status(200).json({
      test,
      addSpend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'ERROR',
    });
  }
};
