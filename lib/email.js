export const sendEmail = async (data) => {
  console.log(data);
  let transportData;
  for (let value of data.values()) {
    transportData = value;
  }
  return fetch("/api/mail_test", {
    method: "POST",
    body: transportData,
    // body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
};
// .then((res) => {
//   console.log("메일 보내러 옴???");
//   if (!res.ok) throw new Error("Failed to send message");
//   return res.json();
// });
