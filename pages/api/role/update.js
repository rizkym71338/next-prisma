import { findRole, updateRole } from "../../../prisma/role";

export default async function (req, res) {
  const { id } = req.query;
  const { name } = req.body;

  // check field
  if (!id || !name) {
    return res.status(403).json({
      msg: "id, name must be provided",
    });
  }

  switch (req.method) {
    case "PUT":
      // check user
      const role = await findRole(id);
      if (!role) {
        return res.status(403).json({
          msg: "role not found",
        });
      }

      // update role
      await updateRole(id, { name });
      return res.status(200).json({
        msg: "role updated",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
