import { useRouter } from "next/router";

export default (req, res) => {
  const router = useRouter();
  console.log(router.query, "아아아아아앙");
  res.status(200).json({ text: "Hello" });
};
