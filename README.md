# :pushpin: Momoa
>공유 가계부 서비스
 
- DEMO : (http://43.201.17.158:3001)
</br>

## 0. 프로젝트 소개
모모아는 수입과 지출 관리, 분석을 위한 가계부 웹입니다. 또한 유저 간 공유 기능을 통해 가계부를 공동으로 관리할 수 있도록 했습니다.  

</br>

## 1. 제작 기간 & 참여 인원
- 2023.02.11 ~ 2023.02.25 
- 팀 프로젝트(4명)
- 담당 역할 : DB설계, 카카오 로그인 api, 회원가입, 가계부 그래프 데이터 가공, 가계부 공유 기능 구현

</br>

## 2. 사용 기술
#### `Back-end`
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">

   </br>
   
#### `AWS` 
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
  
</br>

## 3. ERD 설계
<img src="https://user-images.githubusercontent.com/116782318/221226448-e03cc19f-1242-492b-8663-7688ef9b2b6d.png" width="800px">  

</br>

## 4. API명세
Click 👉 [API 전체 명세 링크](https://principled-gorgonzola-3a1.notion.site/bfa856609ba0495785dbb2fafafd27cc?v=320eb5aa9d4949cdae088bcbdee6b23f)

</br>

<img src="https://user-images.githubusercontent.com/116782318/226643275-0563c64e-670a-4026-a79d-4f1dbea46b63.png" width="800px">
<img src="https://user-images.githubusercontent.com/116782318/226643320-fb8bcee7-99c9-4496-bdde-a87b4ecde100.png" width="800px">
<img src="https://user-images.githubusercontent.com/116782318/226643348-9dc94ac6-20cb-46fd-a542-7e347530084d.png" width="800px">
<img src="https://user-images.githubusercontent.com/116782318/226643368-a8df706d-cfec-4ec9-ad78-af243e113c13.png" width="800px">

</br>

## 5. 주요 구현 기능
>- 카카오 로그인 api
>- 회원가입(이메일 인증)
>- 가계부 그래프 데이터 가공
>- 가계부 공유

</br>

<div markdown="1">

### 5.1. 카카오 로그인 api
  
- **카카오 토큰 발급** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Ckakao.js#L22)
  - 카카오 서버로 인가코드를 담은 POST 비동기 요청을 날려 토큰을 요청합니다.
  - 응답으로 사용자 정보를 요청할 때 사용할 카카오 엑세스 토큰과 리프레시 토큰을 받습니다.
  
- **사용자 정보 요청** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Ckakao.js#L40)
  - 헤더에 토큰을 담은 axios 요청을 날립니다.
  - 응답으로 사용자 정보를 가져옵니다.
  
- **가입/로그인 처리** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Ckakao.js#L52)
  - 받아 온 사용자 정보를 DB에서 조회하여 가입 여부를 확인합니다.
  - 이미 가입된 경우 JWT토큰을 발행하여 로그인 처리 해주고, 가입되지 않은 경우 DB에 유저정보를 저장 후 JWT토큰을 발행합니다.
  - try-catch 문으로 예외처리 합니다.

- **결과 응답** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Ckakao.js#L146)
  - jwt 엑세스 토큰은 localstorage에, 리프레쉬 토큰은 DB에 저장합니다.
  - 요청 처리 성공 시 메인 페이지를 렌더합니다.

 </br>


### 5.2. 회원가입
### 5.2.1 이메일 인증

- **이메일 인증 요청 처리** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Csignup.js#L29)
  - 이메일 중복검사 통과 시 6자리의 숫자로 구성된 인증코드를 생성합니다.
  - 생성한 인증코드를 nodemailer를 통해 사용자가 입력한 이메일로 발송합니다. 

  - if문으로 인증코드 만료/불일치/성공의 경우로 예외처리 합니다.
 
- **결과 응답** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Csignup.js#L56)
  - 이메일 입력 후 인증코드 입력창을 렌더합니다.
 
 </br>
 
 ### 5.2.2 회원가입 및 로그인

- **인증코드 확인/회원가입 요청처리** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Csignup.js#L72)
  - 사용자가 입력한 인증코드를 확인합니다. 
  - POST요청으로 넘어온 유저정보를 DB에 저장합니다.
  - JWT토큰을 발급하고 access토큰은 localstorage에, refresh토큰은 DB 유저정보에 저장합니다.
  - try-catch 문으로 예외처리 합니다.
 
- **결과 응답** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/Csignup.js#L77)
  - 인증코드 검사 통과 시 유저 정보 입력화면을 렌더합니다. 
  - 로그인 완료시 메인 화면을 렌더합니다.

</br>

### 5.3. 가계부 그래프 데이터 가공

- **함수 선언** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/CSheetData.js#L12)
  - DB에서 현재 연도로 조회하여 {작성일자, 금액}데이터를 요소로 갖는 배열을 매개변수로 받는 함수를 선언합니다.

- **개별 데이터를 월별로 합치기** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/CSheetData.js#L16)
  - 빈 배열 months에 중복되지 않게 월 값을 넣습니다.
  - reduce() 메소드를 사용하여 같은 달의 금액을 합산합니다.
  - map()메소드를 사용하여 {x:월, y:금액} 형태의 객체를 생성합니다.
 
- **결과 응답** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/CSheetData.js#L47)
  - 현재일자 기준 연도값으로 DB에서 수입/지출 데이터를 검색해 결과를 위에서 선언한 함수의 매개변수로 넘깁니다.
  - {incomeArr: 수입데이터, spendArr: 지출 데이터} 형식으로 응답을 보냅니다.
  - try-catch문으로 에러처리 하였습니다.

</br>


### 5.4. 가계부 공유, 승인/거절 처리

- **가계부 초대** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/CSheetData.js#L94)
  - DB의 `DBhub`테이블에 사용자의 `user_email`과 공유할 가계부의 `sheet_id`값에 해당하는 컬럼에 `guest`값으로 초대할 회원의 email을, `auth`값으로 2:`false`값을 update합니다.
  - 공유할 가계부 정보, 최초 작성자, 초대된 사용자의 정보를 DB에 저장하되 권한을 부여하지 않은 상태입니다.
  - 초대 받은 사용자가 로그인 시 마이페이지에 해당 초대 알림이 표시됩니다.

- **초대 승인/거절 처리** :pushpin: [코드 확인](https://github.com/nyondoo/momoa/blob/347d1d57ed1143cc73aa6b7cb4ca1ff381a2c043/server/controller/CSheetData.js#L117)
  - 요청 시 승인의 경우 `Y`값을, 거절의 경우 `N`값을 담아옵니다.
  - 승인의 경우 `DBhub`테이블에서 초대받은 사용자의 이메일 값인 `guest`, 해당 가계부의 `sheet_id` 컬럼의 `auth`값을 1:`true`로 변경합니다.
  - 거절의 경우 `DBhub`테이블에서 초대받은 사용자의 이메일 값인 `guest`, 해당 가계부의 `sheet_id` 컬럼의 `guest`값을 null로 변경합니다.

</div>

</br>


## 6. 핵심 트러블 슈팅
### 6.1. 로그인 후 메인페이지 렌더 오류 발생
- 저는 가계부, 마이페이지 같은 페이지는 회원 개인정보가 담겨있기 때문에 보안 절차가 있어야 한다고 생각했습니다.

- 따라서 접근하는 모든 요청은 토큰을 검증하는 미들웨어를 거치도록 했습니다. 
- 아래 **기존 코드** 와 같이 미들웨어를 거치기 전 axios interceptor로 토큰이 만료되었다면 리프레쉬 토큰을 통해 엑세스 토큰을 재발급해주도록 했습니다.

<summary><b>기존 코드</b></summary>
<div markdown="1">

~~~javascript
import axios from 'axios';
import axiosurl from '../url';

const axiosJWT = axios.create();
const accessToken = localStorage.getItem('accessToken');
axiosJWT.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;

axiosJWT.interceptors.request.use(
  async (config) => {
    await axios
      .get(axiosurl.interceptor1, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        return config;
      })
      .catch(async (err2) => {
        if (
          err2.response.data.message === 'TokenExpiredError' ||
          err2.response.data.message === 'TokenNull' ||
          err2.response.data.message === 'JsonWebTokenError'
        ) {
          const rep = await axios.get(axiosurl.interceptor2);
          const newAccessToken = rep.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          axiosJWT.defaults.headers.common[
            'authorization'
          ] = `Bearer ${newAccessToken}`;
          console.log(newAccessToken);
          config.headers.authorization = `Bearer ${newAccessToken}`;
          return config;
        } else {
          alert('error!');
          return Promise.reject(false);
        }
      });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
~~~

</div>


- 이 때 기존 엑세스 토큰이 만료되어 새로운 토큰을 발급해 준 후, 새로운 토큰으로 미들웨어에서 토큰검증을 거쳐야 했습니다.    
- 아래 **개선된 코드**와 같이 새로 발급된 토큰을 React 화면단에서 새로 저장한 후 미들웨어를 거치도록 하여 페이지 렌더 오류를 개선하였습니다.

<summary><b>개선된 코드</b></summary>
<div markdown="1">

~~~javascript
//헤더에 토큰을 새로 저장하는 함수
const setToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  axiosJWT.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
};

export default axiosJWT;

//내보낸 함수를 React화면단에서 import하여 로그인 요청 응답을 받고 실행하게 함
export { setToken };


...
  // 로그인 api 요청
  function login() {
    axios({
      url: axiosurl.login,
      method: 'POST',
      withCredentials: true,
      data: {
        user_email: Email,
        user_pw: Password,
      },
    })
      .then((res) => {
        const accessToken = res.data.accessToken;
        console.log(res.data);
        localStorage.setItem('accessToken', accessToken);
        setToken();
        navigate('/account');
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  }
~~~

</div>

</br>

## 7. 회고 / 느낀점
>프로젝트 개발 회고 글: https://url.kr/zja2cg
