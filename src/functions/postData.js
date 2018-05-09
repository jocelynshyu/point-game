import axios from 'axios';
import { API_DOMAIN } from '../constants/api';
import { getAll } from './getData';

export const addRecord = (input, onFinish, onError) => {
  return axios.post(`${API_DOMAIN}/records/create`, input)
    .then(({ data: { status, message } }) => {
      if (status === 'failed') { throw message; }
    })
    .then(onFinish)
    .catch(onError);
};

export default { addRecord };
