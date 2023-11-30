const User = require("../models/userModel");
const CryptoJS = require("crypto-js");

const userController = {
  get: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body.newUser,
        { new: true }
      );
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const passDes = CryptoJS.DES.decrypt(user.password, "buihuudat").toString(
        CryptoJS.enc.Utf8
      );

      if (password !== passDes)
        return res.status(401).json({ message: "Password incorrect" });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  register: async (req, res) => {
    const { email, username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ messagee: "User existed" });
      }
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({ messagee: "Email existed" });
      }

      req.body.password = CryptoJS.DES.encrypt(
        password,
        "buihuudat"
      ).toString();

      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
