import { TaiKhoan } from "../model";

export type LoginResponse = Omit<TaiKhoan, "matKhau"> & {
  token: string;
};
