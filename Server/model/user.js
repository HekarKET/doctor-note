import mongoose from "mongoose";

const schema = {
  name: { type: String, require: true },
  userName: { type: String, require: true, index: { unique: true } },
  state: { type: String, require: true },
  destrict: { type: String, require: true },
  address: { type: String, require: true },
  email: { type: String, require: true },
  //It will not be returned by default in the data when you fetch
  password: { type: String, require: true, select: false },
};

const UserSchema = mongoose.Schema(schema);
const userModedel = mongoose.model("user", UserSchema);
export default userModedel;


