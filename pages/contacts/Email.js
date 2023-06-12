import utilStyles from "../../styles/utils.module.css";
import btnStyle from "../../styles/button.module.css";
import { useEffect, useRef, useState } from "react";
import { Mail_input, Mail_Ul, Mail_Li, Mail_btn } from "../../styles/styledCom";
import { useRouter } from "next/router";

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

const Email = () => {
  const [_add, _setAdd] = useState("");
  const [emailList, setEmailList] = useState(emails);
  const [keyB, setKeyB] = useState(-1);
  const [drob, setDrop] = useState(false);
  const [mailCheck, setMailCheck] = useState(false);
  const eRef = useRef();
  const router = useRouter();

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
        <h3>이메일을 입력해주시면 해당 메일로 연락메일을 보내드립니다.</h3>
        {!mailCheck ? (
          <p className={utilStyles.email_add_check_p}>
            올바른 이메일 주소를 입력해주세요!
          </p>
        ) : (
          <p className={utilStyles.email_add_check_p}>굳!</p>
        )}
        <Mail_input
          type="email"
          placeholder="이메일 입력"
          value={_add}
          onChange={(e) => {
            control(e);
          }}
          onKeyUp={handleKeyUp}
          check={mailCheck}
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
        {mailCheck ? (
          <button
            className={btnStyle.send_btn}
            able={mailCheck}
            onClick={async () => {
              return send_mail(_add).then(() => router.reload());
            }}
          >
            <span className={btnStyle.send_btn_span}></span>
            메일 전송
          </button>
        ) : (
          <></>
        )}
      </div>
      <div></div>
    </div>
  );
};

async function send_mail(email_add) {
  await fetch(`../api/send_email`, {
    method: "POST",
    body: JSON.stringify({ email_address: email_add }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return alert("메일 전송 성공!");
}

export default Email;
