import { useEffect, useState, useCallback } from "react";
import utilStyles from "../../styles/utils.module.css";
import time from "../api/time";
import { Voice_input } from "../../styles/styledCom";

const initValue = {
  name: "",
  position: "",
  phone: "",
  email: "",
};

const Voice = () => {
  const [audioAct, setAudioAct] = useState(false);
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [value, setValue] = useState(initValue);
  const [touched, setTouched] = useState({});
  const [fileCheck, setFileCheck] = useState(false);

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

  // 녹음 시작
  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      console.log(source);

      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 획득 후 녹음 시작
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
      analyser.onaudioprocess = function (e) {
        setOnRec(false);
      };
    });
    setFileCheck(false);
  };

  // 녹음 중지
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
      onSubmitAudioFile();
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    setFileCheck(true);
  };

  // 녹음파일 전송
  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      const { year, month, day, hours, minutes } = time();
      // 파일 전송을 위한 form data 생성
      const formData = new FormData();
      const makeFile = new Promise((res, rej) => {
        const file = new File(
          [audioUrl],
          `contact_voice_${year}${month}${day}_${hours}${minutes}.mp3`,
          {
            type: "audio",
          }
        );
        if (file) res(file);
      });
      makeFile
        .then((file) => {
          formData.append("file", file);
          formData.append("jsonData", JSON.stringify(value));
        })
        .then(() => {
          for (let value of formData.values()) {
            console.log(value);
          }
          // dispatch(sound_function.sound_transfer(formData));
        });
    }
  }, [audioUrl]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      setAudioAct(true);
    }).catch;
  }, []);

  return (
    <>
      {audioAct ? (
        <div className={utilStyles.voice_act}>
          <h1>목소리를 남겨주시면 제게 전달됩니다!</h1>
          <form className={utilStyles.voice_form}>
            <label>Name</label>
            <Voice_input
              onBlur={onBlur}
              type="text"
              name="name"
              onChange={handleChange}
            />
            <label>Position</label>
            <Voice_input
              onBlur={onBlur}
              type="text"
              name="position"
              onChange={handleChange}
            />
            <label>Phone</label>
            <Voice_input
              onBlur={onBlur}
              type="text"
              name="phone"
              onChange={handleChange}
            />
            <label>Email</label>
            <Voice_input
              onBlur={onBlur}
              type="text"
              name="email"
              onChange={handleChange}
            />
          </form>
          <h2>5초동안 목소리를 남겨주세요</h2>
          <button
            className={utilStyles.voice_btn}
            disabled={
              !value.name || !value.position || !value.phone || !value.email
            }
            onClick={onRec ? onRecAudio : offRecAudio}
          >
            녹음하기
          </button>
          {fileCheck && <button>보내기</button>}
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
