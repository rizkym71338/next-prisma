import { createCategory } from "../../../prisma/category";

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
      // check category
      // const category = await findcategoryByName(name);
      // if (category) {
      //   return res.status(403).json({
      //     msg: "category already exist",
      //   });
      // }

      // create new category
      try {
        await createCategory({ name });
      } catch (err) {
        // console.error(err);
        return res.status(200).json({
          msg: err.message,
        });
      }
      return res.status(200).json({
        msg: "category created",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
