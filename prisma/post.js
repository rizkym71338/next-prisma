import prisma from ".";

// CREATE
export const createPost = async (data) => {
  const post = await prisma.post.create({
    data,
  });
  return post;
};

// READ
export const findPost = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return post;
};

export const findAllPost = async () => {
  const post = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return post;
};

export const findPostByName = async (title) => {
  const post = await prisma.post.findUnique({
    where: {
      title,
    },
    select: {
      id: true,
      title: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return post;
};

// UPDATE
export const updatePost = async (id, data) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data,
  });
  return post;
};

// DELETE
export const deletePost = async (id) => {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return post;
};
