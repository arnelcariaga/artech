import connectDB from "./../../middleware/mongoDB";
const User = require("./../../utils/models/user.model");

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const data = req.body;

      const user = await User.deleteOne({ _id: data.selectedUserId });

      if (user.deletedCount === 1) {
        res.json({
          status: "ok",
          code: "user_deleted",
          msg: "Usuario eliminado",
          data: user,
        });
      } else {
        res.json({
          status: "error",
          code: "user_not_deleted",
          msg: "No se pudo eliminar el usuario",
          data: user,
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
