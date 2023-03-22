import { useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const newSheet = async (items) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_IP}/api/createSheet`,
    items
  );
  return res.data;
};

export const useSheetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(newSheet, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('sheets', 'mypages', data);
    },
  });
};
