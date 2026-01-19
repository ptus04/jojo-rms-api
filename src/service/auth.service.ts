import { LoginResponse } from "@src/dto/LoginResponse.dto";
import { TaiKhoan } from "@src/model";
import taiKhoanRepository from "@src/repository/tai-khoan.repository";
import { hashToBase64 } from "@src/util/hash.util";
import { generateUserToken } from "@src/util/jwt.util";

const login = async (
  tenDangNhap: string,
  matKhau: string,
): Promise<LoginResponse | null> => {
  const user: TaiKhoan | null = await taiKhoanRepository.find(tenDangNhap);
  if (!user) {
    return null;
  }

  const hashedPassword = hashToBase64(matKhau);
  if (user.matKhau !== hashedPassword) {
    return null;
  }

  const token = generateUserToken(
    user.maNhanVien,
    user.tenDangNhap,
    user.vaiTro,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { matKhau: _userPassword, ...userWithoutPassword } = user;
  return { ...userWithoutPassword, token };
};

export default { login };
