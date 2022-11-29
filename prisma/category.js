import prisma from ".";

// CREATE
export const createCategory = async ({ name }) => {
  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  return category;
};

// READ
export const findCategory = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      posts: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return category;
};

export const findAllCategory = async () => {
  const category = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      posts: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return category;
};

// UPDATE
export const updateCategory = async (id, data) => {
  const post = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return post;
};

// DELETE
export const deleteCategory = async (id) => {
  const category = await prisma.category.delete({
    where: {
      id,
    },
  });
  return category;
};
