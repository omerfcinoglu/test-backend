const express = require("express");
const router = express.Router();

// Sample data with better structure
const samplePages = [
    {
        id: 1,
        title: "Ana Sayfa",
        content: "Bu test sayfası.",
        slug: "ana-sayfa",
        createdAt: "2024-01-01T00:00:00Z"
    },
    {
        id: 2,
        title: "Hakkımızda",
        content: "Hakkımızda metni.",
        slug: "hakkimizda",
        createdAt: "2024-01-02T00:00:00Z"
    }
];

// GET /pages → Return all pages
router.get("/", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: samplePages,
            count: samplePages.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch pages"
        });
    }
});

// GET /pages/:id → Return single page
router.get("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const page = samplePages.find(p => p.id === id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.json({
            success: true,
            data: page
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch page"
        });
    }
});

module.exports = router;