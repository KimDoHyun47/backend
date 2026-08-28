const prisma = require("../lib/prisma");

const isNotFoundError = (error) => error?.code === "P2025";

const publicSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
};

const findAll = () =>
  prisma.card.findMany({
    orderBy: { createdAt: "desc" },
    select: publicSelect,
  });

const findById = (id) =>
  prisma.card.findUnique({
    where: { id },
    select: publicSelect,
  });

const findPasswordById = (id) =>
  prisma.card.findUnique({
    where: { id },
    select: { password: true },
  });

const create = (data) =>
  prisma.card.create({
    data,
    select: publicSelect,
  });

const update = async (id, data) => {
  try {
    return await prisma.card.update({
      where: { id },
      data,
      select: publicSelect,
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
  findPasswordById,
  create,
  update,
  remove,
};
