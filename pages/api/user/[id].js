import { findUser } from "../../../prisma/user";

export default async function (req, res) {
  const { id } = req.query;

  // check field
  if (!id) {
    return res.status(403).json({
      msg: "id must be provided",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        // find user
        const user = await findUser(id);
        return res.status(200).json({
          msg: "user founded",
          result: user,
        });
      } catch (err) {
        return res.status(404).json({
          msg: "user not found",
        });
      }
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
