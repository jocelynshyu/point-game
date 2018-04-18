import axios from 'axios';

const API_DOMAIN = 'https://ladder.puffsnow.cc';

export const getAll = () => {
  return axios.get(`${API_DOMAIN}/members/all`)
    .then(({ data: { members } }) => {
      if (window.localStorage) {
        localStorage.setItem('members', JSON.stringify(members));
      }
      return members;
    })
    .catch(() => null);
};

export const getPlayerDetail = (id) => {
  return axios.get(`${API_DOMAIN}/members/detail/${id}`)
    .then(({ data }) => {
      if (window.localStorage) {
        localStorage.setItem('detail', JSON.stringify(data));
      }
      return data;
    })
    .catch(() => null);
};

export const getPlayerRecords = (id) => {
  return axios.get(`${API_DOMAIN}/members/records/${id}?num=0`)
    .then(({ data: { records } }) => {
      if (window.localStorage) {
        localStorage.setItem('records', JSON.stringify(records));
      }
      return records;
    })
    .catch(() => null);
};

export default { getAll, getPlayerDetail, getPlayerRecords };
