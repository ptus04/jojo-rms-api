import { body } from "express-validator";

export default [
  body("tenDangNhap")
    .notEmpty()
    .withMessage("Tên đăng nhập không được để trống")
    .matches(/^[a-zA-Z0-9_.]+$/)
    .withMessage(
      "Tên đăng nhập chỉ được chứa chữ cái, số và ký tự gạch dưới (_) hoặc dấu chấm (.)",
    )
    .isString()
    .withMessage("Tên đăng nhập phải là chuỗi ký tự"),
  body("matKhau")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 8, max: 20 })
    .withMessage("Mật khẩu phải có ít nhất 8 ký tự và tối đa 20 ký tự")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
    )
    .withMessage(
      "Mật khẩu Phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt",
    )
    .isString()
    .withMessage("Mật khẩu phải là chuỗi ký tự"),
];
