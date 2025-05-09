import type { TPlayer, TScore, TWinnerResult } from "../types/game";

export const HUMAN = "X"; // символ игрока
export const COMPUTER = "O"; // символ ИИ

// Все возможные выигрышные комбинации по индексам
export const WIN_COMBOS: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

// Проверка победы: возвращает игрока и его выигрышную линию
export const isWinner = (board: TPlayer[]): TWinnerResult => {
  for (let line of WIN_COMBOS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
};

// Возвращает список доступных индексов
export const getAvailableMoves = (board: TPlayer[]): number[] => {
  return board.map((val, idx) => (val === "" ? idx : null)).filter((v): v is number => v !== null);
};

// Алгоритм Минимакс с альфа-бета отсечением
export const minimax = (
  board: TPlayer[],
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): TScore => {
  const winner = isWinner(board);
  if (winner?.player === HUMAN) return { score: depth - 10 };
  if (winner?.player === COMPUTER) return { score: 10 - depth };
  if (getAvailableMoves(board).length === 0) return { score: 0 };

  if (isMaximizing) {
    let maxScore = -Infinity;
    let move: number | undefined;

    for (const index of getAvailableMoves(board)) {
      board[index] = COMPUTER;
      const result = minimax(board, depth + 1, false, alpha, beta);
      board[index] = "";
      if (result.score > maxScore) {
        maxScore = result.score;
        move = index;
      }
      alpha = Math.max(alpha, maxScore);
      if (beta <= alpha) break;
    }
    return { score: maxScore, move };
  } else {
    let minScore = Infinity;
    let move: number | undefined;

    for (const index of getAvailableMoves(board)) {
      board[index] = HUMAN;
      const result = minimax(board, depth + 1, true, alpha, beta);
      board[index] = "";
      if (result.score < minScore) {
        minScore = result.score;
        move = index;
      }
      beta = Math.min(beta, minScore);
      if (beta <= alpha) break;
    }
    return { score: minScore, move };
  }
};

// Выбор хода компьютера с вероятностью случайного
export const bestMove = (board: TPlayer[]): void => {
  const difficulty = 0.8;

  if (Math.random() < difficulty) {
    const { move } = minimax(board, 0, true, -Infinity, Infinity);
    if (move !== undefined) board[move] = COMPUTER;
  } else {
    const moves = getAvailableMoves(board);
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    board[randomMove] = COMPUTER;
  }
};

