import { useEffect, useState } from "react";
import { bestMove, HUMAN, isWinner } from "./GameUtils";
import type { TPlayer } from "../types/game";

// Хук логики игры: хранит состояние, обрабатывает ходы и победу
export const useGameLogic = () => {
  const [board, setBoard] = useState<TPlayer[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<TPlayer | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isHumanTurn, setIsHumanTurn] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      const newBoard = [...board];
      bestMove(newBoard); // рандомный ход с умом
      setBoard(newBoard);
      setIsHumanTurn(true);
    }, 1000);
  }, []);

  // Обработка хода игрока
  const handleCellClick = (index: number) => {
    if (board[index] !== "" || winner || !isHumanTurn) return;

    const newBoard = [...board];
    newBoard[index] = HUMAN;
    setBoard(newBoard);
    setIsHumanTurn(false);

    const result = isWinner(newBoard);
    if (result) {
      setWinner(result.player);
      setWinningLine(result.line);
      return;
    }
    if (newBoard.every((cell) => cell !== "")) {
      setWinner("Draw");
      return;
    }

    // Ход компьютера с задержкой
    setTimeout(() => {
      bestMove(newBoard);
      setBoard([...newBoard]);
      setIsHumanTurn(true);

      const computerResult = isWinner(newBoard);
      if (computerResult) {
        setWinner(computerResult.player);
        setWinningLine(computerResult.line);
      } else if (newBoard.every((cell) => cell !== "")) {
        setWinner("Draw");
      }
    }, 500);
  };

  // Сброс игры
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setWinningLine(null);
    setIsHumanTurn(true);
  };

  return {
    board,
    winner,
    winningLine,
    isHumanTurn,
    handleCellClick,
    resetGame,
  };
};
