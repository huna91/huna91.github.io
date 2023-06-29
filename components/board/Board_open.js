import React, { useEffect } from "react";
import styles from "./board.module.css";

const Board_open = ({ setModal }) => {
  const modalRef = useRef();
  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler); // 모바일 대응
    };
  });

  return (
    <div ref={modalRef} className={styles.modal_wrap}>
      dd
      <button className={styles.modal_close} onClick={closeModal}>
        X
      </button>
      <div className={styles.board_open_container}></div>
    </div>
  );
};

export default Board_open;
