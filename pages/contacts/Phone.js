//https://giron.tistory.com/75

import React, { useState } from "react";

const Phone = () => {
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function getNumber({ target }) {
    setNumber(target.value);
  }

  async function submit() {
    const _res = await fetch("../api/send_sms", {
      method: "POST",
      body: JSON.stringify({ phone_num: number }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (_res) {
      console.log(_res);
      setIsLoading(false);
    }
  }
  return (
    <div>
      번호를 입력하시면 제 번호로 문자가 전송됩니다.
      <div>
        <label>휴대폰번호를 입력해 주세요.</label>
        <input onChange={getNumber} />

        <button onClick={submit}>입력</button>
      </div>
    </div>
  );
};

export default Phone;
