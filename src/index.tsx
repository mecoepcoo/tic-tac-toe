import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

type squareFlag = 'X' | 'O' | null;

type SquareProps = {
  inputValue: squareFlag;
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
};

const Square: React.FC<SquareProps> = (props: SquareProps) => {
  let { inputValue } = props;
  // const [value, setValue] = useState<squareFlag>(null);

  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {inputValue}
    </button>
  );
}

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<squareFlag>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    let newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i: number) {
    return <Square inputValue={squares[i]} onClick={() => handleClick(i)} />;
  };

  let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  const winner = calculateWinner(squares);
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game: React.FC = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<squareFlag>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
