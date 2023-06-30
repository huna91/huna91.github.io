import fs from "fs";

export default async function createData(req, res) {
  await new Promise((resolve, reject) => {
    const dataBuffer = fs.readFileSync("json/data.json");
    const newData = JSON.parse(req.body);
    const prevData = JSON.parse(dataBuffer.toString());
    prevData.push(newData);
    resolve(prevData);
  })
    .then((_prevData) => {
      const saveData = JSON.stringify(_prevData);
      fs.writeFileSync("json/data.json", saveData);
    })
    .then(() => {
      res.status(200);
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });
}
