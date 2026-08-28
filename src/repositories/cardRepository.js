const prisma = require("../lib/prisma");

const isNotFoundError = (error) => error?.code === "P2025";

const findAll = () =>
  prisma.card.findMany({
    orderBy: { createdAt: "desc" },
  });

const findById = (id) =>
  prisma.card.findUnique({
    where: { id },
  });

const create = (data) =>
  prisma.card.create({
    data,
  });

const update = async (id, data) => {
  try {
    return await prisma.card.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    throw error;
  }
};

const remove = async (id) => {
  try {
    await prisma.card.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (isNotFoundError(error)) {
      return false;
    }
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
