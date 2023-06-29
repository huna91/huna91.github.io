import React from "react";
import styles from "./board.module.css";

const Board_write = ({ setModal }) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className={styles.modal_wrap}>
      sss
      <button className={styles.modal_close} onClick={closeModal}>
        X
      </button>
      <div className={styles.board_write_container}>
        <label>제목</label>
        <input type="text" placeholder="흔적게시판에 보여지는 타이틀 입니다." />
        <label>암호</label>
        <input type="text" placeholder="글을 다시 조회할때 필요합니다." />
        <label>흔적 남기시는 분</label>
        <input type="text" placeholder="성함, 회사명 등 " />
        <label>연락처</label>
        <input type="text" placeholder="휴대폰, 이메일 등" />
        <label>흔적</label>
        <input type="textarea" />
      </div>
    </div>
  );
};

export default Board_write;
