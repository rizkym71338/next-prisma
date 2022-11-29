import { findAllPost } from "../../../prisma/post";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      // find all post
      const post = await findAllPost();
      return res.status(200).json({
        msg: "post founded",
        result: post,
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
