import { deleteUser, findUser } from "../../../../prisma/user";

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
      // check user
      try {
        await findUser(id);
      } catch (err) {
        return res.status(404).json({
          msg: "user not found",
        });
      }

      // delete user
      await deleteUser(id);
      return res.status(200).json({
        msg: "user deleted",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
