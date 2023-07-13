import fs from "fs";

export default async function createData(req, res) {
  const time = Date.now();
  await new Promise((resolve, reject) => {
    // const dataBuffer = fs.readFileSync("json/data.json");
    const newData = JSON.parse(req.body);
    // const prevData = JSON.parse(dataBuffer.toString());
    // prevData.push(newData);
    resolve(newData);
  })
    .then((_data) => {
      const saveData = JSON.stringify(_data);
      fs.writeFileSync(`json/${time}.json`, saveData);
    })
    .then(() => {
      res.status(200);
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });
}
