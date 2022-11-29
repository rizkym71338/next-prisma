import prisma from ".";

// READ
export const findUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return user;
};

export const findAllUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    // include: {
    //   role: true,
    // },
  });
  return user;
};

export const findUserByName = async (name) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return user;
};

export const findUserForLoginByName = async (name) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      password: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return user;
};

// CREATE
export const createUser = async ({ name, password, roleId }) => {
  const user = await prisma.user.create({
    data: {
      name,
      password,
      roleId,
    },
  });
  return user;
};

// UPDATE
export const updateUser = async (id, { name, password, roleId }) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      password,
      roleId,
    },
  });
  return user;
};

// DELETE
export const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};
