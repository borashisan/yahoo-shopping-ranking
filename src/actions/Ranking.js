import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V2/categoryRanking';
const APP_ID = 'dj00aiZpPUZ4ekVUOFVDY3d1WiZzPWNvbnN1bWVyc2VjcmV0Jng9M2I-';

const startRequest = categoryId => ({
  type: 'STARTREQUEST',
  payload: { categoryId },
});

const receiveData = (categoryId, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { categoryId, error, response },
});

const finishRequest = categoryId => ({
  type: 'FINISH_REQUEST',
  payload: {categoryId},
});

export const fetchRanking = categoryId => {
  return async dispatch => {
    dispatch(startRequest(categoryId));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });

    try {
      const response = await axios.get(`${API_URL}?${queryString}`);
      console.log(response);
      dispatch(receiveData(categoryId, null, response));
    } catch (err) {
      dispatch(receiveData(categoryId, err));
    }
    dispatch(finishRequest(categoryId));
  };
};
