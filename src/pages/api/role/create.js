import { createRole, findRoleByName } from "../../../prisma/role";

export default async function (req, res) {
  const { name } = req.body;

  // check field
  if (!name) {
    return res.status(403).json({
      msg: "name must be provided",
    });
  }

  switch (req.method) {
    case "POST":
      // check role
      const role = await findRoleByName(name);
      if (role) {
        return res.status(403).json({
          msg: "role already exist",
        });
      }

      // create new role
      await createRole({ name });
      return res.status(200).json({
        msg: "role created",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
