import { findPost, updatePost } from "../../../prisma/post";

export default async function (req, res) {
  const { id } = req.query;
  const { title, categories } = req.body;

  // check field
  if (!id || !title || !categories) {
    return res.status(403).json({
      msg: "id, title, categories must be provided",
    });
  }

  switch (req.method) {
    case "PUT":
      // check user
      const post = await findPost(id);
      if (!post) {
        return res.status(403).json({
          msg: "post not found",
        });
      }

      // convert to array of object
      var categoryIDs = [];
      await categories.map((category) => {
        categoryIDs.push({ id: category });
      });

      // update post
      await updatePost(id, { title, categories: { set: categoryIDs } });
      return res.status(200).json({
        msg: "post updated",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
