import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET_KEY ?? "development_secret_key";

export const generateUserToken = (_id: string, name: string, role: string) => {
  return jwt.sign({ _id, name, role }, SECRET, { expiresIn: "1h" });
};

export const verifyUserToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET) as jwt.JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: "Expired token.", code: 401 };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { error: "Invalid token.", code: 401 };
    } else if (error instanceof jwt.NotBeforeError) {
      return { error: "Token not active.", code: 401 };
    }

    return { error: (error as Error).message, code: 500 };
  }
};
