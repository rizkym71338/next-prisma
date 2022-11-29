import { findRole } from "../../../prisma/role";

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
        // find role
        const role = await findRole(id);
        return res.status(200).json({
          msg: "role founded",
          result: role,
        });
      } catch (err) {
        return res.status(404).json({
          msg: "role not found",
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
