const cardService = require("./cardService");
const AppError = require("../errors/AppError");

const handle = (fn, fallbackMessage) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: fallbackMessage });
  }
};

const listCards = handle(async (_req, res) => {
  const cards = await cardService.getCards();
  res.json(cards);
}, "카드를 불러오지 못했습니다.");

const getCard = handle(async (req, res) => {
  const card = await cardService.getCardById(req.params.id);
  res.json(card);
}, "카드를 불러오지 못했습니다.");

const createCard = handle(async (req, res) => {
  const card = await cardService.createCard(req.body);
  res.status(201).json(card);
}, "카드를 만들지 못했습니다.");

const updateCard = handle(async (req, res) => {
  const card = await cardService.updateCard(req.params.id, req.body);
  res.json(card);
}, "카드를 수정하지 못했습니다.");

const deleteCard = handle(async (req, res) => {
  await cardService.deleteCard(req.params.id);
  res.status(204).send();
}, "카드를 삭제하지 못했습니다.");

module.exports = {
  listCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
