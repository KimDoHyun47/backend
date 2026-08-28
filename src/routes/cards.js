const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

router.get("/", cardController.listCards);
router.get("/:id", cardController.getCard);
router.post("/", cardController.createCard);
router.put("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

module.exports = router;
