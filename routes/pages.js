const express = require("express");
const router = express.Router();

// Örnek sayfa listesi (JSON)
const samplePages = [
    { id: 1, title: "Ana Sayfa", content: "Bu test sayfası." },
    { id: 2, title: "Hakkımızda", content: "Hakkımızda metni." }
];

// GET /pages → samplePages döndür
router.get("/", (req, res) => {
    return res.status(200).json(samplePages);
});

// GET /pages/:id → ID’ye göre tek obje döndür
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const page = samplePages.find(p => p.id === id);
    if (!page) return res.status(404).json({ message: "Page bulunamadı" });
    return res.json(page);
});

module.exports = router;
