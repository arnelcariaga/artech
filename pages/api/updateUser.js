import connectDB from "./../../middleware/mongoDB";
const User = require("./../../utils/models/user.model");
const bcrypt = require("bcryptjs");

async function handler(req, res) {
  connectDB();

  if (req.method === "POST") {
    try {
      const data = req.body;

      let newData;

      if (data.password === "" || data.password === " ") {
        newData = {
          username: data.username,
          email: data.email,
          userType: data.userType,
        };
      } else {
        const newPassword = await bcrypt.hash(data.password, 10);
        newData = {
          username: data.username,
          email: data.email,
          password: newPassword,
          userType: data.userType,
        };
      }

      const user = await User.findByIdAndUpdate(data.selectedUserId, newData);

      if (user) {
        res.json({
          status: "ok",
          code: "user_updated",
          msg: "Usuario actualizado",
          data: user,
        });
      } else {
        res.json({
          status: "error",
          code: "user_not_updated",
          msg: "No se pudo actulizar el usuario",
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
