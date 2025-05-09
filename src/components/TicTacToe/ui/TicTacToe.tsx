import animationGrid from "@/assets/lottie/grid.json";
import animationCross from "@/assets/lottie/cross.json";
import animationOval from "@/assets/lottie/oval.json";
import animationWin from "@/assets/lottie/win.json";
import styles from "./TicTacToe.module.scss";
import { Animation } from "../../Animation";
import { useGameLogic } from "../model/GameLogic";
import { COMPUTER, HUMAN } from "../model/GameUtils";
import { useEffect, useState } from "react";

// Главный компонент поля игры "Крестики-нолики"
// Отображает сетку, символы, анимацию победы и автосброс
const TicTacToe = () => {
  const { board, winner, winningLine, handleCellClick, resetGame } = useGameLogic();

  // Анимационные флаги:
  // fadeOut — скрытие всех фигур
  // fadeAll — плавное исчезновение после мигания победной линии
  const [fadeOut, setFadeOut] = useState(false);
  const [blinkCells, setBlinkCells] = useState<number[]>([]);
  const [fadeAll, setFadeAll] = useState(false);

  console.log("winner", winner);

  useEffect(() => {
    if (winner) {
      if (winningLine) setBlinkCells(winningLine); // запускаем мигание победной линии

      setTimeout(() => setFadeAll(true), 1500); // начинаем плавное исчезновение
      setTimeout(() => setFadeOut(true), 1800); // скрытие фигур
      setTimeout(() => {
        // сброс игры
        setFadeOut(false);
        setFadeAll(false);
        setBlinkCells([]);
        resetGame();
      }, 2300);
    }
  }, [winner]);

  // Отрисовка анимации в ячейке
  const renderCellContent = (cell: string, index: number) => {
    if (fadeOut) return null;

    const isBlinking = blinkCells.includes(index);
    const className = `
      ${styles.game_field__animation_symbol}
      ${isBlinking ? styles.fade_blink : ""}
      ${fadeAll ? styles.fade_out_all : ""}
    `;

    if (cell === HUMAN) return <Animation className={className} animationData={animationCross} />;
    if (cell === COMPUTER) return <Animation className={className} animationData={animationOval} />;
    return null;
  };

  return (
    <section className={styles.game_field__wrap}>
      {winner === HUMAN && (
        <Animation className={styles.game_field__animation_win} animationData={animationWin} />
      )}

      <div className={styles.game_field}>
        <Animation className={styles.game_field__animation} animationData={animationGrid} />
        <div className={styles.game_field__grid}>
          {board.map((cell, index) => (
            <div
              key={index}
              className={styles.game_field__cell}
              onClick={() => handleCellClick(index)}
            >
              {renderCellContent(cell, index)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicTacToe;
