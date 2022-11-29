import { deleteRole, findRole } from "../../../prisma/role";

export default async function (req, res) {
  const { id } = req.query;

  // check field
  if (!id) {
    return res.status(403).json({
      msg: "id must be provided",
    });
  }

  switch (req.method) {
    case "DELETE":
      // check role
      try {
        await findRole(id);
      } catch (err) {
        return res.status(404).json({
          msg: "role not found",
        });
      }

      // delete role
      await deleteRole(id);
      return res.status(200).json({
        msg: "role deleted",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
