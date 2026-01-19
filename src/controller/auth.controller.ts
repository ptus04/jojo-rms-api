import { LoginRequest } from "@src/dto/LoginRequest.dto";
import userService from "@src/service/auth.service";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const user = matchedData<LoginRequest>(req);
  const data = await userService.login(user.tenDangNhap, user.matKhau);

  if (!data) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res
    .cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // TODO: set according to token expiry
    })
    .json(data);
};
