import axios from 'axios';
import qs from 'qs';
import { replace } from 'connected-react-router';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V2/categoryRanking';
const APP_ID = 'dj00aiZpPUZ4ekVUOFVDY3d1WiZzPWNvbnN1bWVyc2VjcmV0Jng9M2I-';

const startRequest = category => ({
  type: 'START_REQUEST',
  payload: { category },
});

const receiveData = (category, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { category, error, response },
});

const finishRequest = category => ({
  type: 'FINISH_REQUEST',
  payload: {category},
});

export const fetchRanking = categoryId => {
  return async (dispatch, getState) => {
    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));
    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return
    }

    dispatch(startRequest(category));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId,
    });

    try {
      const response = await axios.get(`${API_URL}?${queryString}`);
      const data = await response.data
      dispatch(receiveData(category, null, data));
    } catch (err) {
      dispatch(receiveData(category, err));
    }
    dispatch(finishRequest(category));
  };
};
