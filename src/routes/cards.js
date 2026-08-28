const express = require("express");
const cardController = require("../controllers/cardController");
const verifyCardPassword = require("../middleware/verifyCardPassword");

const router = express.Router();

router.get("/", cardController.listCards);
router.get("/:id", cardController.getCard);
router.post("/", cardController.createCard);
router.put("/:id", verifyCardPassword, cardController.updateCard);
router.delete("/:id", verifyCardPassword, cardController.deleteCard);

module.exports = router;
