const crypto = require("crypto");
const cardRepository = require("./cardRepository");
const AppError = require("../errors/AppError");

const passwordsMatch = (input, stored) => {
  const a = Buffer.from(input);
  const b = Buffer.from(stored);

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
};

const verifyCardPassword = async (req, _res, next) => {
  try {
    const password = String(req.body?.password ?? "").trim();

    if (!password) {
      throw new AppError("비밀번호를 입력해 주세요.", 400);
    }

    const stored = await cardRepository.findPasswordById(req.params.id);

    if (!stored) {
      throw new AppError("카드를 찾을 수 없습니다.", 404);
    }

    if (!passwordsMatch(password, stored.password)) {
      throw new AppError("비밀번호가 일치하지 않습니다.", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyCardPassword;
