import utilStyles from "../../styles/utils.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Mail_input, Mail_Ul, Mail_Li, Mail_btn } from "../../styles/styledCom";
import { cache } from "react";
import { sendEmail } from "../../lib/email";

export default function Email() {
  const emails = [
    "@naver.com",
    "@gmail.com",
    "@daum.net",
    "@hanmail.net",
    "@yahoo.com",
    "@outlook.com",
    "@nate.com",
    "@kakao.com",
  ];
  const [_add, _setAdd] = useState("");
  const [emailList, setEmailList] = useState(emails);
  const [keyB, setKeyB] = useState(-1);
  const [drob, setDrop] = useState(false);
  const [mailCheck, setMailCheck] = useState(false);
  const [touch, setTouch] = useState(false);
  const [loading, setLoading] = useState(false);
  const eRef = useRef();

  const control = (e) => {
    _setAdd(e.target.value);

    if (e.target.value.includes("@")) {
      setDrop(true);
      setEmailList(
        emails.filter((el) => el.includes(e.target.value.split("@")[1]))
      );
    } else {
      setDrop(false);
      setKeyB(-1);
    }
    mail_check(e.target.value);
  };
  // 이메일 체크
  const mail_check = (address) => {
    const _checkData =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (address.match(_checkData)) {
      setMailCheck(true);
    } else {
      setMailCheck(false);
    }
  };

  // 드롭박스 데이터 클릭하면 인풋에 입력
  const handleDropDownClick = (first, second) => {
    _setAdd(`${first.split("@")[0]}${second}`);
    mail_check(`${first.split("@")[0]}${second}`);
    setDrop(false);
    setKeyB(-1);
  };

  const handleKeyUp = (e) => {
    if (drob) {
      if (e.key === "ArrowDown" && emailList.length - 1 > keyB) {
        setKeyB(keyB + 1);
      }
      if (e.key === "ArrowUp" && keyB >= 0) {
        setKeyB(keyB - 1);
      }
      if (e.key === "Enter" && keyB >= 0) {
        handleDropDownClick(_add, emailList[keyB]);
      }
    }
  };
  const inputHandler = () => setTouch(true);

  const submit = async (email_add) => {
    setLoading(true);
    const _data = new FormData();
    _data.append("jsonData", JSON.stringify({ email_address: `${email_add}` }));

    try {
      await sendEmail(_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (eRef.current && !eRef.current.contains(e.target)) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [eRef]);

  return (
    <div>
      <div className={utilStyles.email_input_container} ref={eRef}>
        <Mail_input
          type="email"
          placeholder="이메일을 입력해주세요."
          value={_add}
          onChange={(e) => {
            control(e);
          }}
          onKeyUp={handleKeyUp}
          check={mailCheck}
          onBlur={inputHandler}
        />
        {drob && (
          <Mail_Ul>
            {emailList.map((item, idx) => (
              <Mail_Li
                key={idx}
                onMouseOver={() => {
                  setKeyB(idx);
                }}
                onClick={() => handleDropDownClick(_add, item)}
                selected={keyB === idx}
              >
                {_add.split("@")[0]}
                {item}
              </Mail_Li>
            ))}
          </Mail_Ul>
        )}
      </div>
      <div>
        <Mail_btn
          // able={mailCheck}
          isLoadin={loading}
          onClick={() => {
            submit(_add);
          }}
          disabled={!mailCheck}
        >
          메일 전송
        </Mail_btn>
      </div>
    </div>
  );
}

// async function submit(email_add) {
//   const _data = new FormData();
//   _data.append("email_address", email_add);

//   const _res = await fetch(`../api/mail_test`, {
//     method: "POST",
//     body: _data,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return "";
// }
// for (let value of _data.values()) {
//   console.log(value);
// }
// const _res = await fetch(`../api/mail_test`, {
//   method: "POST",
//   body: JSON.stringify(_data),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const result = await _res.json();
// if (!_res.ok) {
//   throw new Error(result.message || "서버 메일api 요청 실패");
// }
