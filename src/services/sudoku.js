import axios from '../http';

const encodeBoard = (board) =>
    board.reduce(
      (prev, curr, i) =>
        prev +
        `%5B${encodeURIComponent(curr)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

const encodeParams = params =>
  Object.keys(params)
    .map((key) => `${key}=%5B${encodeBoard(params[key])}%5D`)
    .join("&");


export const fetchBoardValues = async (difficulty) => 
  await axios.get('board', { params: { difficulty } });

export const fetchGrade = async (board) =>
  await axios.post(
    'grade',
    encodeParams({ board }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded;" } },
  );

export const validateBoardValues = async (board) =>
  await axios.post(
    'validate',
    encodeParams({ board }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded;" } },
  );

export const solveBoardValues= async (board) =>
  await axios.post(
    'solve',
    encodeParams({ board }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded;" } },
  );
