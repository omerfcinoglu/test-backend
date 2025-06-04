const Member = require("../models/Members");

const createMember = async (req, res) => {
  try {
    const { name, role, image, description } = req.body;
    const newMember = new Member({ name, role, image, description });
    await newMember.save();
    res.status(201).json({ message: "Member başarıyla oluşturuldu!", member: newMember });
  } catch (error) {
    console.error("💥 Member create full error:", error);
    return res
      .status(500)
      .json({
        message: error.message,         // hata mesajı
        details: error.errors || null   // varsa validasyon detayları
      });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: 1 });
    res.json(members);
  } catch (error) {
    console.error("Member list error:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member bulunamadı!" });
    }
    res.json(member);
  } catch (error) {
    console.error("Get member error:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const updateMember = async (req, res) => {
  try {
    const { name, role, image, description } = req.body;
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { name, role, image, description },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: "Member bulunamadı!" });
    }
    res.json({ message: "Member güncellendi!", member: updatedMember });
  } catch (error) {
    console.error("Update member error:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member bulunamadı!" });
    }
    res.json({ message: "Member başarıyla silindi!" });
  } catch (error) {
    console.error("Delete member error:", error);
    res.status(500).json({ message: "Sunucu hatası!" });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
