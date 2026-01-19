import { Router } from "express";
import { login } from "../controller/auth.controller";
import loginValidator from "../validator/login.validator";
import { handleBadRequest } from "@src/middleware/error-handler.middleware";

const router = Router();
router.post("/login", loginValidator, handleBadRequest, login);

export default router;
