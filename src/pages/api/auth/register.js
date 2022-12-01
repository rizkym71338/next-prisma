import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { createUser, findUserForLoginByName } from "../../../../prisma/user";

export default async function (req, res) {
  const { name, password } = req.body;

  // check field
  if (!name || !password) {
    return res.status(403).json({
      msg: "name, password must be provided",
    });
  }

  switch (req.method) {
    case "POST":
      // check user
      const user = await findUserForLoginByName(name);
      if (user) {
        res.status(403).json({
          msg: "user already exist",
        });
      }

      // create new user
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({
        name,
        password: hashPassword,
      });

      // delete password on data
      delete newUser.password;

      // create token
      const token = jwt.sign(
        {
          user: newUser,
          exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 1,
        }, // 1 day
        process.env.JWT_SECRET
      );

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1, // 1 day
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);

      return res.status(200).json({
        msg: "success register",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
