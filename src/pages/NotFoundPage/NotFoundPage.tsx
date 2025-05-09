import { TicTacToe } from "@/components/TicTacToe";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <main className={styles.not_found}>
      <section className={styles.not_found__content}>
        <h1 className={styles.not_found__title}>404 - Страница не найдена</h1>
        <p className={styles.not_found__description}>
          Кажется, вы забрели не туда. Но не переживайте! <br /> Здесь есть <b>«Крестики-Нолики»</b>
          ! Сыграем ?
        </p>
        <TicTacToe />
      </section>
    </main>
  );
};

export default NotFoundPage;
