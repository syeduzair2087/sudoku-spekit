import React, { useEffect, useState } from 'react';
import { Row, Button } from 'antd';
import { QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { fetchBoardValues, fetchGrade, validateBoardValues, solveBoardValues } from '../../services/sudoku';

import { DIFFICULTY, STATUS } from './constants';

import './styles.scss';

const Sudoku = () => {

  const createEmptyBoard = () => Array(9).fill(Array(9).fill(0));
 
  const [board, setBoard] = useState(createEmptyBoard());
  const [status, setStatus] = useState(STATUS.UNSOLVED);
  const [difficulty, setDifficulty] = useState('');

  const getGrade = async (board) => {
    const { data: { difficulty } } = await fetchGrade(board);
    setDifficulty(difficulty);
  }

  const getBoardValues = async (difficulty = DIFFICULTY.EASY) => {
    const { data: { board } } = await fetchBoardValues(difficulty);
    setBoard(board);
    setStatus(STATUS.UNSOLVED);
    if (difficulty === DIFFICULTY.RANDOM) {
      getGrade(board);
    } else {
      setDifficulty(difficulty);
    }
  }

  const validateBoard = async () => {
    const { data: { status } } = await validateBoardValues(board);
    setStatus(status);
  }

  const solveBoard = async () => {
    const { data: { solution, status } } = await solveBoardValues(board);
    setBoard(solution);
    setStatus(status);
  }

  useEffect(() => {
    getBoardValues();
  }, []);

  const onValueChange = (value, row, column) => {
    if ((value >= 1 && value <= 9) || !value) {
      const newBoard = [...board];
      newBoard[row][column] = value ? value : 0;
      setBoard(newBoard);
    }
  }

  const onClickClearBoard = () => {
    setBoard(createEmptyBoard());
  }

  return (
    <div className="sudoku-container">
      <div className="board-container">
          {board ? board.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((column, columnIndex) => (
                <input
                  key={`${rowIndex}-${columnIndex}`}
                  value={column === 0 ? '' : column}
                  onChange={event => onValueChange(event.target.value, rowIndex, columnIndex)}
                />
              ))}
            </Row>
          )) : null}
      </div>
      <div className="controls-container">
        <div className="status-container">
          <div>
            <b>Status:</b> {status}
          </div>
          <div>
            <b>Difficulty:</b> {difficulty}
          </div>
        </div>
        <div className="difficulty-controls">
          <span>Generate:</span>
          {Object.values(DIFFICULTY).map(difficulty => (
            <Button key={difficulty} size="large" onClick={() => getBoardValues(difficulty)}>{difficulty}</Button>
          ))}
          <Button type="danger" size="large" ghost onClick={onClickClearBoard}>Clear</Button>
        </div>
        <div className="actions">
          <Button type="primary" icon={<QuestionCircleOutlined />} size="large" onClick={validateBoard}>
            Validate
          </Button>
          <Button type="primary" icon={<CheckCircleOutlined />} size="large" onClick={solveBoard}>
            Solve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sudoku;
