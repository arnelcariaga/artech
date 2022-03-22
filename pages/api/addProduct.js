import connectDB from "./../../middleware/mongoDB";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({
      keepExtensions: true,
      uploadDir: "./public/img",
    });
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      const productExist = await Product.find({ name: fields.name });
      if (productExist.length !== 0) {
        resolve("Producto ya existe");
      }
      resolve({ fields, files: files.thumbnail });
    });
  });

const Product = require("../../utils/models/product.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const result = await asyncParse(req);
      if (result === "Producto ya existe") {
        res.json({
          status: "error",
          code: "product_already_exist",
          msg: "El producto ya existe.",
          data: {},
        });
      } else {
        var data;

        if (result.files) {
          data = {
            ...result.fields,
            thumbnail: "/img/" + result.files.newFilename,
          };
        } else {
          data = result.fields;
        }

        const product = await Product.create(data);

        if (product) {
          res.json({
            status: "ok",
            code: "product_added",
            msg: "Producto agregado",
            data: product,
          });
        } else {
          res.json({
            status: "error",
            code: "product_not_added",
            msg: "No se pudo agregar el producto",
            data: product,
          });
        }
      }
    } catch (err) {
      res.json({
        status: "error",
        code: "server_error",
        msg: "Error con el servidor",
        data: err,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default handler;
