import { findAllUser } from "../../../../prisma/user";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      // find all user
      const user = await findAllUser();
      return res.status(200).json({
        msg: "user founded",
        result: user,
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
