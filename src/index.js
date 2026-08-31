require("dotenv").config();

const app = require("./app");
const prisma = require("./lib/prisma");

const PORT = Number(process.env.PORT) || 4000;

async function start() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error.code || error.errorCode || error.name);
    console.error(error.message);
  }

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start();
