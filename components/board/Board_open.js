import React, { useEffect, useRef, useState } from "react";
import styles from "./board.module.css";
import { useRouter } from "next/router";

const Board_open = ({ setModal, data }) => {
  const modalRef = useRef();
  const router = useRouter();
  const closeModal = () => {
    setModal(false);
  };

  const deleteCon = async (res, rej) => {
    await fetch("../api/board/deleteData", {
      method: "POST",
      body: data.index,
    }).then((e) => {
      console.log(e.status);
      if (e.status === 200) {
        setModal(false);
        return alert("삭제 완료");
      } else {
        rej();
      }
    });
  };

  const [update, setUpdate] = useState(false);
  const [preData, setPreData] = useState(data);
  const changeData = ({ target }) => {
    setPreData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    console.log(preData);
  };

  const update_end_btn = async () => {
    await fetch("../api/board/updateData", {
      method: "POST",
      body: JSON.stringify(preData),
    }).then((e) => {
      if (e.ok) {
        setModal(false);
        return alert("수정 완료");
      }
    });
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
      <div>
        <button className={styles.modal_close} onClick={closeModal}>
          X
        </button>
      </div>
      <div className={styles.board_open_container}>
        <h2>
          {update ? (
            <input
              onChange={(e) => {
                changeData(e);
              }}
              placeholder={data.data.title}
              name="title"
              type="text"
            />
          ) : (
            data.data.title
          )}
        </h2>
        <div>
          작성자:{" "}
          {update ? (
            <input
              onChange={(e) => {
                changeData(e);
              }}
              placeholder={data.data.name}
              name="name"
              type="text"
            />
          ) : (
            data.data.name
          )}
        </div>
        <div>
          연락처:{" "}
          {update ? (
            <input
              onChange={(e) => {
                changeData(e);
              }}
              placeholder={data.data.phone}
              name="phone"
              type="text"
            />
          ) : (
            data.data.phone
          )}
        </div>
        <div>
          {update ? (
            <textarea
              placeholder={data.data.contents}
              name="contents"
              maxLength="300"
              onChange={(e) => {
                changeData(e);
              }}
            />
          ) : (
            data.data.contents
          )}
        </div>
      </div>
      {update ? (
        <div>
          <button
            onClick={() => {
              setUpdate(!update);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              update_end_btn();
            }}
          >
            수정완료
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setUpdate(!update);
            }}
          >
            수정
          </button>
          <button
            onClick={async () => {
              return deleteCon()
                .then(() => router.reload())
                .catch(() => alert("삭제실패"));
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default Board_open;
