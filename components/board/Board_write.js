import React, { useState } from "react";
import styles from "./board.module.css";
import { useRouter } from "next/router";

const Board_write = ({ setModal }) => {
  const init = {
    title: "",
    password: "",
    name: "",
    phone: "",
    contents: "",
  };
  const router = useRouter();
  const [data, setData] = useState(init);
  const [touched, setTouched] = useState({});

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const changeData = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const closeModal = () => {
    setModal(false);
  };

  const write_end_btn = async () => {
    await fetch("../api/board/createData", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((e) => {
      if (e.ok) {
        setModal(false);
        return alert("작성 완료");
      }
    });
  };
  return (
    <div className={styles.modal_wrap}>
      sss
      <button className={styles.modal_close} onClick={closeModal}>
        X
      </button>
      <div className={styles.board_write_container}>
        <br />
        <label>제목</label>
        <input
          onBlur={onBlur}
          name="title"
          type="text"
          placeholder="흔적게시판에 보여지는 타이틀 입니다."
          onChange={(e) => {
            changeData(e);
          }}
        />
        <br />
        <label>암호</label>
        <input
          onBlur={onBlur}
          name="password"
          type="text"
          placeholder="글을 다시 조회할때 필요합니다."
          onChange={(e) => {
            changeData(e);
          }}
        />
        <br />
        <label>작성자</label>
        <input
          onBlur={onBlur}
          name="name"
          type="text"
          placeholder="성함, 회사명 등 "
          onChange={(e) => {
            changeData(e);
          }}
        />
        <br />
        <label>연락처</label>
        <input
          onBlur={onBlur}
          name="phone"
          type="text"
          placeholder="휴대폰, 이메일 등"
          onChange={(e) => {
            changeData(e);
          }}
        />
        <br />
        <label>흔적</label>
        <textarea
          onBlur={onBlur}
          name="contents"
          maxLength="300"
          onChange={(e) => {
            changeData(e);
          }}
        />
        <br />
      </div>
      <button
        onClick={async () => {
          return write_end_btn().then(() => router.reload());
        }}
      >
        작성완료
      </button>
    </div>
  );
};

export default Board_write;
