const prismaCode = (error) => error?.code || error?.errorCode || error?.name || "UNKNOWN";

const prismaUserMessage = (error, fallbackMessage) => {
  const code = prismaCode(error);

  if (code === "P1000" || code === "P1001" || code === "P1017" || code === "P1002") {
    return "데이터베이스에 연결하지 못했습니다. DATABASE_URL과 Postgres 상태를 확인해 주세요.";
  }

  if (code === "P2021" || code === "P2010") {
    return "cards 테이블이 없습니다. 서버에서 npx prisma db push를 실행해 주세요.";
  }

  if (code === "P2022") {
    return "DB 컬럼이 스키마와 다릅니다. 서버에서 npx prisma db push를 실행해 주세요.";
  }

  if (error?.name === "PrismaClientInitializationError") {
    return "Prisma 클라이언트를 초기화하지 못했습니다. 서버에서 npx prisma generate를 실행해 주세요.";
  }

  return fallbackMessage;
};

module.exports = {
  prismaCode,
  prismaUserMessage,
};
