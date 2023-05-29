import { useEffect, useState } from "react";
import utilStyles from "../../styles/utils.module.css";

const Voice = () => {
  const [audioAct, setAudioAct] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      setAudioAct(true);
    }).catch;
  }, []);
  return (
    <>
      {audioAct ? (
        <div className={utilStyles.voice_act}>
          <h1>제게 목소리를 남겨주세요!</h1>
          <button className={utilStyles.voice_btn}>녹음하기</button>
        </div>
      ) : (
        <div className={utilStyles.voice_notAct}>
          <h1>마이크 사용 권한을 허용해 주세요!</h1>
        </div>
      )}
    </>
  );
};

export default Voice;
