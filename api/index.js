// api/index.js - FIXED VERSION
const serverless = require("serverless-http");
require("dotenv").config();

const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Sample data
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

// Health check route
app.get("/", (req, res) => {
    res.json({
        message: "API is running!",
        timestamp: new Date().toISOString(),
        availableEndpoints: ["/pages", "/pages/:id"]
    });
});

// Pages routes - directly defined here to avoid routing issues
app.get("/pages", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: samplePages,
            count: samplePages.length
        });
    } catch (error) {
        console.error("Error fetching pages:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pages"
        });
    }
});

app.get("/pages/:id", (req, res) => {
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
        console.error("Error fetching page:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch page"
        });
    }
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
});

module.exports = serverless(app, {
    callbackWaitsForEmptyEventLoop: false
});