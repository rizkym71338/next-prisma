import { createUser, findUserByName } from "../../../prisma/user";
import bcrypt from "bcrypt";

export default async function (req, res) {
  const { name, password, roleId } = req.body;

  // check field
  if (!name || !password || !roleId) {
    return res.status(403).json({
      msg: "name, password, roleId must be provided",
    });
  }

  switch (req.method) {
    case "POST":
      // check user
      const user = await findUserByName(name);
      if (user) {
        return res.status(403).json({
          msg: "user already exist",
        });
      }

      // create new user
      const hashPassword = await bcrypt.hash(password, 10);
      await createUser({ name, password: hashPassword, roleId });
      return res.status(200).json({
        msg: "user created",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
