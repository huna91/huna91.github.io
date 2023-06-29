import React from "react";
import styles from "./board.module.css";

const Board_open = ({ setModal }) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className={styles.modal_wrap}>
      dd
      <button className={styles.modal_close}>X</button>
      <div className={styles.board_open_container}></div>
    </div>
  );
};

export default Board_open;
