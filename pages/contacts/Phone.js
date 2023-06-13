import React, { useCallback, useEffect, useRef, useState } from "react";
import utilStyles from "../../styles/utils.module.css";
import btnStyles from "../../styles/button.module.css";
import { Phone_box } from "../../styles/styledCom";
import { useRouter } from "next/router";

const init_tel = {
  cul: 0,
  phone: ["", "", "", "", "", "", "", "", "", "", ""],
};

const Phone = () => {
  const [tel, setTel] = useState(init_tel);
  const refContainer = useRef();
  const router = useRouter();

  function updateArr(array, index, value) {
    return (array[index] = value);
  }

  function getNumber(_number) {
    if (tel.cul >= 11 || tel.cul < 0) {
      return;
    }
    let _arr = [...tel.phone];
    updateArr(_arr, tel.cul, _number);
    setTel((prev) => ({
      ...prev,
      cul: tel.cul + 1,
      phone: _arr,
    }));
  }

  function delNumber() {
    if (tel.cul >= 12 || tel.cul < 1) {
      return;
    }
    let _arr = [...tel.phone];
    updateArr(_arr, tel.cul - 1, "");
    setTel((prev) => ({
      ...prev,
      cul: tel.cul - 1,
      phone: _arr,
    }));
  }

  async function submit() {
    const number = tel.phone.join("");
    await fetch("../api/send_sms", {
      method: "POST",
      body: JSON.stringify({ phone_num: number }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return alert("문자 전송 성공!");
      })
      .catch(() => {
        return alert("문자 전송 실패!");
      });
  }

  const hadleKeydown = useCallback((eve) => {
    console.log(eve);
    if (eve.key >= 0 && eve.key <= 9) {
      getNumber(eve.key);
    } else if (eve.key === "Delete" || eve.key === "Backspace") {
      delNumber();
    }
  }, []);
  useEffect(() => {
    // if (refContainer.current) {
    document.addEventListener("keydown", hadleKeydown);
    return document.removeEventListener("keydown", hadleKeydown);
    // }
  }, []);

  return (
    <div ref={refContainer}>
      <h2>번호를 입력하시면 제 번호로 문자가 전송됩니다.</h2>
      <div>
        <div className={utilStyles.phone_num_container}>
          {tel.phone.map((val, ind, arr) => {
            return (
              <Phone_box
                key={ind}
                className={utilStyles.phone_num_box}
                ind={ind}
                cur={tel.cul}
              >
                {val}
              </Phone_box>
            );
          })}
        </div>
        <div className={utilStyles.phone_table_wrap}>
          <table className={utilStyles.phone_input_table}>
            <tr>
              <td onClick={() => getNumber(7)}>7</td>
              <td onClick={() => getNumber(8)}>8</td>
              <td onClick={() => getNumber(9)}>9</td>
            </tr>
            <tr>
              <td onClick={() => getNumber(4)}>4</td>
              <td onClick={() => getNumber(5)}>5</td>
              <td onClick={() => getNumber(6)}>6</td>
            </tr>
            <tr>
              <td onClick={() => getNumber(1)}>1</td>
              <td onClick={() => getNumber(2)}>2</td>
              <td onClick={() => getNumber(3)}>3</td>
            </tr>
            <tr>
              <td colSpan="2" onClick={() => getNumber(0)}>
                0
              </td>
              <td onClick={() => delNumber()}>del</td>
            </tr>
          </table>
          <button
            className={btnStyles.phone_send_btn}
            onClick={async () => {
              return submit().then(() => router.reload());
            }}
            disabled={tel.phone[10] == ""}
          >
            <span className={btnStyles.phone_send_span1}></span>
            <span className={btnStyles.phone_send_span2}></span>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Phone;
