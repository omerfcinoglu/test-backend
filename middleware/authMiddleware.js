const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Authorization header'ını al (örn: "Bearer <token>")
  const authHeader = req.header("Authorization");

  // Eğer header yoksa, yetkisiz erişim döndür
  if (!authHeader) {
    return res.status(401).json({ message: "Yetkisiz erişim! Token eksik." });
  }

  // Token bilgisini "Bearer" kısmından ayırıyoruz
  const token = authHeader.replace("Bearer ", "");

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Doğrulanan token bilgisini isteğe ekle
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz token!" });
  }
};

module.exports = authMiddleware;
