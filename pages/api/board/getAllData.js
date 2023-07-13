import path from "path";
import { promises as fs } from "fs";

const boardDirectory = path.join(process.cwd(), "json");

export default async function getAllData(req, res) {
  const fileNames = await fs.readdir(boardDirectory);
  const allBoardData = fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.json$/, "");

    const fullPath = path.join(boardDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, "utf8");

    return { id, ...JSON.parse(fileContents) };
  });

  const resolvedBoardData = await Promise.all(allBoardData);

  res.status(200).json(resolvedBoardData);
}
