import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Account from './pages/Account';
import Kakao from './pages/Kakao';
import Test from './pages/Test';
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PriavateRoute';
import { useRecoilValue } from 'recoil';
import { FinishAtom } from './atoms/AuthAtom';
import InfoInit from './pages/InfoInit';
import AccountTest from './pages/AccountTest';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_IP;
axios.defaults.withCredentials = true;

function App() {
  const finish = useRecoilValue(FinishAtom);

  return (
    <>
      <Routes>
        <Route path="/test/*" element={<PrivateRoute component={<Test />} />} />
        <Route
          path="/"
          element={<PublicRoute restricted={true} component={<Main />} />}
        />

        <Route
          path="/signup"
          element={<PublicRoute restricted={true} component={<SignUp />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute restricted={true} component={<Login />} />}
        />
        <Route path="/auth/kakao" element={<Kakao />} />
        {/* 테스트 페이지 */}
        <Route path="/accountTest" element={<AccountTest />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/account/*"
          element={<PrivateRoute component={<Account />} />}
        />

        {finish && <Route path="/infoset" element={<InfoInit />} />}
      </Routes>
    </>
  );
}

export default App;
