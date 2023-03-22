import { QueryClient, useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const setGoal = async (items) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_IP}/api/writegoal`,
    items
  );
  return res.data;
};

export const useGoalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(setGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getgoal', data);
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
