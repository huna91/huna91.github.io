import React, { useState } from "react";
import { encrypt, decrypt } from "../../lib/block";

const Blockchain = () => {
  const data = {
    name: "윤하영",
    password: "123",
    contents: "hihi",
  };

  const [text, setText] = useState("d");
  const [bb, setBB] = useState("bb");
  const aaaa = () => {
    const _text = encrypt(data, "secret");
    setText(_text);
  };
  const bbbb = () => {
    const _text = decrypt(text, "secret");
    setBB(_text);
  };

  return (
    <div style={{ position: "relative" }}>
      원본:{JSON.stringify(data)}
      <button onClick={aaaa}>암호화</button>
      암호화:{text}
      <button onClick={bbbb}>복호화</button>
      복호화:{JSON.stringify(bb)}
    </div>
  );
};

export default Blockchain;
