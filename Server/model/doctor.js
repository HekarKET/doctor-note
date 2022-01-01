import mongoose from "mongoose";
import { patientSchema } from "./patient.js";

const schema = {
  name: { type: String, require: true },
  //index unique because username should be unique
  userName: { type: String, require: true, index: { unique: true } },
  state: { type: String, require: true },
  destrict: { type: String, require: true },
  address: { type: String, require: true },
  email: { type: String, require: true },
  //It will not be returned by default in the data when you fetch
  password: { type: String, require: true, select: false },
  patients: [patientSchema],
};
//enable to get us created at and updated at
const UserSchema = mongoose.Schema(schema, { timestamps: true });
const userModedel = mongoose.model("user", UserSchema);
export default userModedel;
