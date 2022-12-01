import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { findUserForLoginByName } from "../../../../prisma/user";

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
      try {
        // check user
        const user = await findUserForLoginByName(name);

        // compare password
        const isPasswordCorrect = compareSync(password, user.password);
        if (!isPasswordCorrect) {
          return res.status(403).json({
            msg: "wrong password",
          });
        }

        // delete password on data
        delete user.password;

        // create token
        const token = jwt.sign(
          { user, exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 1 }, // 1 day
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
          msg: "success login",
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
