const cardRepository = require("../repositories/cardRepository");
const AppError = require("../errors/AppError");

const normalizeCardInput = (payload) => {
  const title = String(payload?.title ?? "").trim();
  const content = String(payload?.content ?? "").trim();

  if (!title) {
    throw new AppError("제목을 입력해 주세요.", 400);
  }

  return { title, content };
};

const normalizePassword = (payload) => {
  const password = String(payload?.password ?? "").trim();

  if (!password) {
    throw new AppError("비밀번호를 입력해 주세요.", 400);
  }

  return password;
};

const getCards = () => cardRepository.findAll();

const getCardById = async (id) => {
  const card = await cardRepository.findById(id);

  if (!card) {
    throw new AppError("카드를 찾을 수 없습니다.", 404);
  }

  return card;
};

const createCard = (payload) => {
  const data = normalizeCardInput(payload);
  const password = normalizePassword(payload);
  return cardRepository.create({ ...data, password });
};

const updateCard = async (id, payload) => {
  const data = normalizeCardInput(payload);
  const card = await cardRepository.update(id, data);

  if (!card) {
    throw new AppError("카드를 찾을 수 없습니다.", 404);
  }

  return card;
};

const deleteCard = async (id) => {
  const deleted = await cardRepository.remove(id);

  if (!deleted) {
    throw new AppError("카드를 찾을 수 없습니다.", 404);
  }
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
};
