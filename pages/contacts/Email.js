import Link from "next/link";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Mail_Ul, Mail_Li } from "../../styles/styledCom";

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
  };

  // 드롭박스 데이터 클릭하면 인풋에 입력
  const handleDropDownClick = (first, second) => {
    _setAdd(`${first.split("@")[0]}${second}`);
    setDrop(false);
    setKeyB(-1);
  };

  const handleKeyUp = (e) => {
    if (drob) {
      if (e.key === "ArrowDown" && emailList.length - 1 > keyB) {
        setKeyB(keyB + 1);
      }
      //emailList.length에 -1을 해주는 이유는 selected의 최대값을 맞춰주기 위해서이다.
      //예를들어 밑에 emailList 2개가 나왔다고 가정했을 때, selected값이 최대 1까지 변할 수 있게 해줘야한다.
      //'ArrowDown'키를 누르면 selected는 0이 되고, 한번 더 누르면 1이 되고, 그 다음은 더이상 옵션이 없기 때문에 키가 안먹히게 해주는 것이다.

      if (e.key === "ArrowUp" && keyB >= 0) {
        setKeyB(keyB - 1);
      }
      if (e.key === "Enter" && keyB >= 0) {
        handleDropDownClick(_add, emailList[keyB]);
      }
    }
  };

  return (
    <div>
      <div ref={eRef}>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          value={_add}
          onChange={(e) => {
            control(e);
          }}
          onKeyUp={handleKeyUp}
        />
        {drob && (
          <Mail_Ul>
            {emailList.map((item, idx) => {
              <Mail_Li
                key={idx}
                onMouseOver={() => {
                  setKeyB(idx);
                }}
                onClick={() => handleDropDownClick(_add, item)}
                onSelect={keyB === idx}
              >
                {_add.split("@")[0]}
                {item}
              </Mail_Li>;
            })}
          </Mail_Ul>
        )}
      </div>
      {/* <input
        onChange={(e) => {
          console.log(e.currentTarget.value);
          _setAdd(e.currentTarget.value);
        }}
        type="email"
      />
      <select
        onChange={(e) => {
          e.currentTarget.value === "직접입력"
            ? setInputAct(true)
            : setInputAct(false);
          console.log(inputAct);
        }}
      >
        <option>naver.com</option>
        <option>gmail.com</option>
        <option>직접입력</option>
      </select>
      <button
        onClick={() => {
          console.log(send_mail("kkkkkkkkkkkkkkkkkkkkkk"));
        }}
      >
        이메일 보내기
      </button> */}
    </div>
  );
};

async function send_mail(email_add) {
  const _data = new FormData();
  _data.append("email_address", email_add);
  const res = await fetch(`../api/hello`, { query: email_add });
  return res.json();
}

export default Email;
