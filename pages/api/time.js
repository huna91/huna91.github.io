export default function time() {
  const date = new Date();
  const put = {
    year: date.getFullYear(),
    month: ("0" + (date.getMonth() + 1)).slice(-2),
    day: ("0" + date.getDate()).slice(-2),
    hours: ("0" + date.getHours()).slice(-2),
    minutes: ("0" + date.getMinutes()).slice(-2),
    seconds: ("0" + date.getSeconds()).slice(-2),
  };

  return put;
}
