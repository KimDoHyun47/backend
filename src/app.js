const express = require("express");
const cors = require("cors");
const cardRoutes = require("./card/cardRoutes");
const prisma = require("./lib/prisma");
const { prismaCode, prismaUserMessage } = require("./errors/prismaError");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS origin not allowed"));
    },
  }),
);
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      db: false,
      code: prismaCode(error),
      message: prismaUserMessage(error, "데이터베이스 상태를 확인하지 못했습니다."),
    });
  }
});

app.use("/cards", cardRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "요청한 경로를 찾을 수 없습니다." });
});

app.use((error, _req, res, _next) => {
  if (error.message === "CORS origin not allowed") {
    return res.status(403).json({ message: "허용되지 않은 origin입니다." });
  }
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error(error);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

module.exports = app;
