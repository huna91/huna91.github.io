import React, { useEffect, useRef, useState } from "react";
import utilStyles from "../../styles/utils.module.css";
import { Phone_box } from "../../styles/styledCom";

const init_tel = {
  cul: 0,
  phone: ["", "", "", "", "", "", "", "", "", "", ""],
};

const Phone = () => {
  const [number, setNumber] = useState("");
  const [tel, setTel] = useState(init_tel);
  const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef();

  function updateArr(array, index, value) {
    return (array[index] = value);
  }
  function getNumber(_number) {
    // let _arr = [...tel.phone];
    // updateArr(_arr, tel.cul, _number);
    // console.log(_arr, "변경");
    // console.log(tel.phone, "이전");
    setTel((prev) => ({
      ...prev,
      cul: tel.cul++,
      phone: updateArr([...tel.phone], tel.cul, _number),
    }));
  }
  function delNumber() {}

  async function submit() {
    await fetch("../api/send_sms", {
      method: "POST",
      body: JSON.stringify({ phone_num: number }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      console.log("결과");
      setIsLoading(false);
    });
  }

  document.addEventListener("keypress", (eve) => {
    getNumber(eve.key);
  });
  useEffect(() => {}, []);

  return (
    <div>
      <h2>번호를 입력하시면 제 번호로 문자가 전송됩니다.</h2>
      <div>
        <div className={utilStyles.phone_num_container}>
          {tel.phone.map((val, ind, arr) => {
            console.log(ind);
            return (
              <Phone_box
                ref={boxRef}
                className={utilStyles.phone_num_box}
                cur={ind}
              >
                {val}
              </Phone_box>
            );
          })}
        </div>
        <div className={utilStyles.phone_table_wrap}>
          <table className={utilStyles.phone_input_table}>
            <tr>
              <td onClick={() => getNumber(1)}>1</td>
              <td onClick={() => getNumber(2)}>2</td>
              <td onClick={() => getNumber(3)}>3</td>
            </tr>
            <tr>
              <td onClick={() => getNumber(4)}>4</td>
              <td onClick={() => getNumber(5)}>5</td>
              <td onClick={() => getNumber(6)}>6</td>
            </tr>
            <tr>
              <td onClick={() => getNumber(7)}>7</td>
              <td onClick={() => getNumber(8)}>8</td>
              <td onClick={() => getNumber(9)}>9</td>
            </tr>
            <tr>
              <td colSpan="2" onClick={() => getNumber(0)}>
                0
              </td>
              <td onClick={() => delNumber()}>del</td>
            </tr>
          </table>
        </div>

        <button onClick={submit}>입력</button>
      </div>
    </div>
  );
};

export default Phone;
