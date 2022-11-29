import { createPost, findPostByName } from "../../../prisma/post";

export default async function (req, res) {
  const { title, categories } = req.body;

  // check field
  if (!title || !categories) {
    return res.status(403).json({
      msg: "title, categories must be provided",
    });
  }

  switch (req.method) {
    case "POST":
      // check post
      const post = await findPostByName(title);
      if (post) {
        return res.status(403).json({
          msg: "post already exist",
        });
      }

      // convert to array of object
      var categoryIDs = [];
      await categories.map((category) => {
        categoryIDs.push({ id: category });
      });

      // create new cpost
      await createPost({ title, categories: { connect: categoryIDs } });

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
