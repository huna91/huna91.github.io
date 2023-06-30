import fs from "fs";
import { resolve } from "path";

export default async function deleteData(req, res) {
  const delIndex = req.body;
  await new Promise((resolve, reject) => {
    const dataBuffer = fs.readFileSync("json/data.json");
    const prevData = JSON.parse(dataBuffer.toString());
    resolve(prevData);
  })
    .then((_prevData) => {
      _prevData.splice(delIndex, 1);
      return JSON.stringify(_prevData);
    })
    .then((saveData) => {
      fs.writeFileSync("json/data.json", saveData);
    })
    .then(() => {
      res.status(200);
      res.send(true);
    })
    .catch(() => {
      // res.status()
      res.send(false);
    });
}
