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

type BoardProps = {
  inputSquares: squareFlag[];
  onClick: ((i: number) => void);
};

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  // const [squares, setSquares] = useState<squareFlag[]>(Array(9).fill(null));
  const { inputSquares } = props;
  // const [xIsNext, setXIsNext] = useState(true);

  function renderSquare(i: number) {
    return <Square inputValue={inputSquares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
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
  const [history, setHistory] = useState<{squares: squareFlag[]}[]>([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i: number) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    let newSquares = current.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) return;
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{
      squares: newSquares,
    }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    console.log(history)
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          inputSquares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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
