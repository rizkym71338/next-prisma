import { findAllCategory } from "../../../prisma/category";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      // find all category
      const category = await findAllCategory();
      return res.status(200).json({
        msg: "category founded",
        result: category,
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
