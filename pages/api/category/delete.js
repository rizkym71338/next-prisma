import {
  deleteCategory,
  findCategory,
  updateCategory,
} from "../../../prisma/category";

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
      // check category
      try {
        await findCategory(id);
      } catch (err) {
        return res.status(404).json({
          msg: "category not found",
        });
      }

      // disconnect relation
      await updateCategory(id, { posts: { set: [] } });

      // delete category
      await deleteCategory(id);
      return res.status(200).json({
        msg: "category deleted",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
