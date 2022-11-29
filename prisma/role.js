import prisma from ".";

// READ
export const findRole = async (id) => {
  const role = await prisma.role.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return role;
};

export const findAllRole = async () => {
  const role = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return role;
};

export const findRoleByName = async (name) => {
  const role = await prisma.role.findUnique({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return role;
};

// CREATE
export const createRole = async ({ name }) => {
  const role = await prisma.role.create({
    data: {
      name,
    },
  });
  return role;
};

// UPDATE
export const updateRole = async (id, { name }) => {
  const role = await prisma.role.update({
    where: { id },
    data: {
      name,
    },
  });
  return role;
};

// DELETE
export const deleteRole = async (id) => {
  const role = await prisma.role.delete({
    where: { id },
  });
  return role;
};
