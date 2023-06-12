import btnStyles from "./button.module.css";

export default function send_btn() {
  return (
    <button className={btnStyles.send_btn}>
      <span className={btnStyles.send_btn_span}></span>
      일단보내기
    </button>
  );
}
