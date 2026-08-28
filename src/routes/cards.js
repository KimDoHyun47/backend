const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const cards = await prisma.card.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(cards);
  } catch (error) {
    console.error("GET /cards", error);
    res.status(500).json({ message: "카드를 불러오지 못했습니다." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const card = await prisma.card.findUnique({
      where: { id: req.params.id },
    });

    if (!card) {
      return res.status(404).json({ message: "카드를 찾을 수 없습니다." });
    }

    res.json(card);
  } catch (error) {
    console.error("GET /cards/:id", error);
    res.status(500).json({ message: "카드를 불러오지 못했습니다." });
  }
});

router.post("/", async (req, res) => {
  try {
    const title = String(req.body?.title ?? "").trim();
    const content = String(req.body?.content ?? "").trim();

    if (!title) {
      return res.status(400).json({ message: "제목을 입력해 주세요." });
    }

    const card = await prisma.card.create({
      data: { title, content },
    });

    res.status(201).json(card);
  } catch (error) {
    console.error("POST /cards", error);
    res.status(500).json({ message: "카드를 만들지 못했습니다." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const title = String(req.body?.title ?? "").trim();
    const content = String(req.body?.content ?? "").trim();

    if (!title) {
      return res.status(400).json({ message: "제목을 입력해 주세요." });
    }

    const card = await prisma.card.update({
      where: { id: req.params.id },
      data: { title, content },
    });

    res.json(card);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "카드를 찾을 수 없습니다." });
    }
    console.error("PUT /cards/:id", error);
    res.status(500).json({ message: "카드를 수정하지 못했습니다." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.card.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "카드를 찾을 수 없습니다." });
    }
    console.error("DELETE /cards/:id", error);
    res.status(500).json({ message: "카드를 삭제하지 못했습니다." });
  }
});

module.exports = router;
