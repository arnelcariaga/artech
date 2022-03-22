import connectDB from "./../../middleware/mongoDB";
const Category = require("./../../utils/models/category.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "GET") {
    try {
      const category = await Category.find({});

      if (category) {
        res.json({
          status: "ok",
          code: "category_added",
          msg: "Categoría agregada",
          data: category,
        });
      } else {
        res.json({
          status: "error",
          code: "category_not_added",
          msg: "No se pudo agregar la categoría",
          data: category,
        });
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
