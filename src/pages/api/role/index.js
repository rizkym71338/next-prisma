import { findAllRole } from "../../../prisma/role";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      // find all user
      const role = await findAllRole();
      return res.status(200).json({
        msg: "role founded",
        result: role,
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
