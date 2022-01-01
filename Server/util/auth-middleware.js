import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req, res, next) => {
  //token should be in header with key token
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.PRIVATE_JWT_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decode;
        next();
        return;
      }
    });
  } else {
    return res.status(401).send({ message: "Unauthorized access" });
  }
};

export const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      userName: user.userName,
      state: user.state,
      destric: user.destric,
    },
    process.env.PRIVATE_JWT_KEY,
    {
      expiresIn: "48h",
    }
  );
};
