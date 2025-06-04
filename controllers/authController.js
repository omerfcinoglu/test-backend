const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin zaten kayıtlı!" });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin başarıyla oluşturuldu!" });
  } catch (error) {
    console.error("Admin register hatası:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Geçersiz kullanıcı adı!" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Hatalı şifre!" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Giriş başarılı!" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

module.exports = { registerAdmin, loginAdmin };
