import axios from 'axios';

const API_KEY = '53608703-aa0418faf5290c51b47c4c69e';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(() => {
      throw new Error('Error');
    });
}
