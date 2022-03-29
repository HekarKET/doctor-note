import * as tf from "@tensorflow/tfjs";
// import modelJson from "../assets/model/model.json"
import path from "path";
import fs from "fs";
import Jimp from "jimp";

export const predPneumonia = async (req, res, next) => {
  let model;
  const loadModel = async () => {
    model = await tf
      .loadLayersModel("http://localhost:3005/public/model/model.json")
      .catch((e) => console.log(e));
    console.log("Model loaded!");
    let filename;
    function callback(err, data) {
      filename = "./public/test.jpg";
      fs.writeFile(filename, data, "binary", (err) => {
        if (!err) console.log(`${filename} created successfully!`);
      });
    }
    const data = fs.readFileSync(req.file.path);
    console.log(data);
    callback(() => {}, data);
    let array = [];
    Jimp.read("./public/test.jpg", function (err, image) {
      image.resize(128, 128);
      for (let i = 0; i < 128; i++) {
        array.push([]);
        for (let j = 0; j < 128; j++) {
          let color = Jimp.intToRGBA(image.getPixelColor(i, j));
          delete color.a;
          array[i].push([...Object.values(color)]);
        }
      }
      let val = tf.tensor3d(array, [128, 128, 3]).reshape([1, 128, 128, 3]);
      let ans = model.predict(val);
      const values = ans.dataSync();
      let response = Array.from(values);
      res.status(200).send(response);
    });
  };

  try {
    loadModel();
  } catch (error) {
    res.status(502).send("Server error");
  }
};
