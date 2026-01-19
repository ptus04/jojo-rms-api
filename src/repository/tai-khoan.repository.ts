import getDb from "@src/database/mongo.database";
import { TaiKhoan } from "@src/model";
import { removeUndefinedProperties } from "@src/util/object.util";
import { WithId } from "mongodb";

const getCollection = () => getDb().collection<TaiKhoan>("tai-khoan");

async function find(tenDangNhap: string): Promise<TaiKhoan | null> {
  return getCollection().findOne<TaiKhoan>(
    { tenDangNhap },
    { projection: { _id: 0 } },
  );
}

async function findAll(): Promise<TaiKhoan[]> {
  return getCollection().find<TaiKhoan>({}).toArray();
}

async function create(taiKhoan: TaiKhoan): Promise<void> {
  await getCollection().insertOne(taiKhoan);
}

async function update(
  tenDangNhap: string,
  taiKhoan: Partial<TaiKhoan>,
): Promise<WithId<TaiKhoan> | null> {
  const updateData = removeUndefinedProperties(taiKhoan);
  if (Object.keys(updateData).length === 0) {
    throw new Error("No valid fields to update");
  }

  const result = await getCollection().findOneAndUpdate(
    { tenDangNhap },
    { $set: updateData },
    { returnDocument: "after" },
  );
  return result;
}

async function remove(tenDangNhap: string): Promise<void> {
  await getCollection().deleteOne({ tenDangNhap });
}

export default { find, findAll, create, update, remove };
