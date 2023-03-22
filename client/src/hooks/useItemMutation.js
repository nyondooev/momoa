import { useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const addItems = async (items) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_IP}/api/writeinfo`,
    items
  );
  return res.data;
};

export const useItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addItems, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('graph', 'getcalendar', 'getgoal', data);
    },
  });
};

// export const useItemMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addItems, {
//     onSuccess: (data) => {
//       queryClient.setQueryData('', ()=>{
//         return {
//           ...olddata,
//           newData:[...oldData, data],
//         }
//       })
//     }
//   });
// };
