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

const setToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  axiosJWT.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
};

export default axiosJWT;
export { setToken };
