import mongoose from "mongoose";

const schema = mongoose.Schema({
  patientName: { type: String, require: true },
  ageRange: String,
  address: String,
  history: [
    {
      diagnosis: { type: String },
      treatmentDetails: {
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        treatment: String,
      },
    },
  ],
});
//enable to get us created at and updated at
export const patientSchema = mongoose.Schema(schema, { timestamps: true });
const patientModel = mongoose.model("patient", patientSchema);
export default patientModel;
