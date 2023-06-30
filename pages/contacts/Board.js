//https://curryyou.tistory.com/493
import React, { useEffect, useRef, useState } from "react";
import utilStyles from "../../styles/utils.module.css";
import { encrypt, decrypt } from "../../lib/board";
import Board_write from "../../components/board/Board_write";
import Board_open from "../../components/board/Board_open";

const Board = () => {
  const liRef = useRef();
  const [data, setData] = useState([]);
  const [input, setInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [opData, setOpData] = useState({ index: 0, data: {} });

  const getAllData = async () => {
    const _data = await fetch("../api/board/getAllData")
      .then((res) => res.json())
      .then((res) => JSON.parse(res));
    setData(_data);
  };
  useEffect(() => {
    getAllData();
  }, []);

  const showModal = (key, ind, __data) => {
    switch (key) {
      case "INPUT":
        return setInput(!input);

      case "OPEN":
        setOpData({ index: ind, data: __data });
        return setOpen(!open);

      default:
        return;
    }
  };
  // const [text, setText] = useState("d");
  // const [bb, setBB] = useState("bb");
  const setEncrypt = (_value) => {
    const _text = encrypt(_value, process.env.BOARD_SECRET_KEY);
    setText(_text);
  };
  const setDecrypt = (_value) => {
    const _text = decrypt(_value, process.env.BOARD_SECRET_KEY);
    setBB(_text);
  };

  return (
    <div className={utilStyles.board_wrap}>
      {input && <Board_write setModal={setInput} />}
      {open && <Board_open setModal={setOpen} data={opData} />}
      <div>
        비밀스런 흔적 남기기
        <button
          onClick={() => {
            showModal("INPUT");
          }}
        >
          글쓰기
        </button>
      </div>

      <div className={utilStyles.board_container}>
        <ul className={utilStyles.board_list}>
          {data.map((val, ind) => {
            return (
              <li
                className={utilStyles.board_list_item}
                key={ind}
                onClick={() => {
                  showModal("OPEN", ind, val);
                }}
              >
                <div className={utilStyles.ball}></div>
                <div className={utilStyles.board_list_item_index}>
                  {ind + 1}
                </div>
                <div className={utilStyles.board_list_item_title}>
                  {val.title}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Board;
