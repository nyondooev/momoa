import React from 'react';
import axios from '../utils/axios';
import axiosurl from '../url';

const Test = () => {
  //     const getUsers = async () => {
  //         const response = await axiosJWT.get('http://localhost:5000/users', {
  //             headers: {
  //                 Authorization: `Bearer ${token}`
  //             }
  //         });
  //         setUsers(response.data);
  //     }
  //   console.log(axios);
  //   console.log(axios.defaults.headers);

  function eventHandle() {
    axios.get(axiosurl.eventHandle).then((response) => {
      console.log('---------------2222222-----------------');
      console.log(response);
    });
  }

  function getSheetData() {
    axios({
      url: axiosurl.getSheetData,
      method: 'get',
      data: {
        sheet_id: 'dkdsu',
      },
    });
  }

  return (
    <div>
      <button type="button" onClick={getSheetData}>
        버튼
      </button>
    </div>
  );
};

export default Test;
