import { deletePost, findPost, updatePost } from "../../../prisma/post";

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
      // check post
      const post = await findPost(id);
      if (!post) {
        return res.status(404).json({
          msg: "post not found",
        });
      }

      // disconnect relation
      await updatePost(id, { categories: { set: [] } });

      // delete post
      await deletePost(id);
      return res.status(200).json({
        msg: "post deleted",
      });
      break;

    default:
      return res.status(403).json({
        msg: "wrong method",
      });
      break;
  }
}
