import express, { urlencoded, json } from "express";
import Mongoose from "mongoose";
// import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import patientRoute from "./routes/patient.js";

const app = express();

//act as a body parser
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));

//To enanble cross origin access
app.use(cors());

//To manage cookies at client side
app.use(cookieParser());

//Load dotenv to read .env and set env variables when app starts
dotenv.config();

//We can have our own priavte porn (local can be set to 3001)
const PORT = process.env.PORT || 3005;

app.use("/auth", authRoutes);
app.use("/patient", patientRoute);


app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message || err });
  console.log(err  ) ;
});

Mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
