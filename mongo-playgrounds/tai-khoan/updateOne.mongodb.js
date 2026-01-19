// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("ktpm-database");

db.getCollection("tai-khoan").updateOne(
  { tenDangNhap: "ptus.04" },
  {
    $set: {
      tenDangNhap: "ptus.04",
      matKhau: "RbvwmMa8z/iZzMrE7jI4yiYyqk0ZbLdJMfPb82jSoSE=",
      vaiTro: "NVQL",
      maNhanVien: "NV001",
      email: "hello@example.com",
      trangThai: true,
    },
  },
  { upsert: true },
);

// Find a document in a collection.
db.getCollection("tai-khoan").findOne({ tenDangNhap: "ptus.04" });
