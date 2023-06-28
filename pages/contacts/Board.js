import React, { useEffect, useState } from "react";
import utilStyles from "../../styles/utils.module.css";
import { encrypt, decrypt } from "../../lib/board";

const Board = () => {
  const [data, setData] = useState([]);
  const getAllData = async () => {
    const _data = await fetch("../api/board/getAllData")
      .then((res) => res.json())
      .then((res) => JSON.parse(res));
    setData(_data);
  };
  useEffect(() => {
    getAllData();
  }, []);

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
      <h1>컨택보드</h1>
      {data.map((val, ind) => {
        return (
          <ul className={utilStyles.board_list}>
            <li className={utilStyles.board_list_item}>
              <div className={utilStyles.board_list_item_index}>{ind + 1}</div>
              <div className={utilStyles.board_list_item_title}>
                {val.title}
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Board;
