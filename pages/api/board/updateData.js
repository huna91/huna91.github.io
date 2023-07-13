import fs from "fs";

export default async function updateData(req, res) {
  const newData = JSON.parse(req.body);
  await new Promise((resolve, reject) => {
    const dataBuffer = fs.readFileSync("json/data.json");
  })
    .then()
    .catch();
}
