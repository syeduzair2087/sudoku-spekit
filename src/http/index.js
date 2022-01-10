import axios from 'axios';

const BASE_URL = 'https://sugoku.herokuapp.com/';

export default axios.create({ baseURL: BASE_URL });
