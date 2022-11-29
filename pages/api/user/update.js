import { findUser, updateUser } from "../../../prisma/user";
import bcrypt from "bcrypt";

export default async function (req, res) {
  const { id } = req.query;
  const { name, password, roleId } = req.body;

  // check field
  if (!id || !name || !password || !roleId) {
    return res.status(403).json({
      msg: "id, name, password, roleId must be provided",
    });
  }

  switch (req.method) {
    case "PUT":
      // check user
      const user = await findUser(id);
      if (!user) {
        return res.status(403).json({
          msg: "user not found",
        });
      }

      // update user
      const hashPassword = await bcrypt.hash(password, 10);
      await updateUser(id, { name, password: hashPassword, roleId });
      return res.status(200).json({
        msg: "user updated",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
