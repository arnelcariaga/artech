import connectDB from "./../../middleware/mongoDB";
const Category = require("./../../utils/models/category.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const data = req.body;

      const category = await Category.deleteOne({
        _id: data.selectedCategoryId,
      });

      if (category.deletedCount === 1) {
        res.json({
          status: "ok",
          code: "category_deleted",
          msg: "Categoría eliminada",
          data: category,
        });
      } else {
        res.json({
          status: "error",
          code: "category_not_deleted",
          msg: "No se pudo eliminar la categoría",
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
