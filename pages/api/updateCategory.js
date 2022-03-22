import connectDB from "./../../middleware/mongoDB";
const Category = require("./../../utils/models/category.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const data = req.body;

      const category = await Category.findByIdAndUpdate(
        data.selectedCategoryId,
        {
          name: data.name,
        }
      );

      if (category) {
        res.json({
          status: "ok",
          code: "category_updated",
          msg: "Categoría actualizada",
          data: category,
        });
      } else {
        res.json({
          status: "error",
          code: "category_not_updated",
          msg: "No se pudo actulizar la categoría",
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
