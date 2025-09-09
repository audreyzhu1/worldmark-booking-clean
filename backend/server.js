const express = require("express");
const cors = require("cors");
const { getSheetData } = require("./sheets");

const app = express();

// CORS configuration for production
app.use(cors({
  origin: [
    'http://localhost:3000',  // Keep for local development
    // We'll add your frontend URL after deployment
  ],
  credentials: true
}));

app.get("/api/availability", async (req, res) => {
    console.log("📥 /api/availability endpoint was hit");
  
    try {
      const data = await getSheetData();
      console.log("✅ Returning data:", data);
      res.json(data);
    } catch (err) {
      console.error("FULL ERROR DUMP:", err);
      res.status(500).json({
        error: "Server Error",
        detail: err.message,
        stack: err.stack,
      });
    }
});

// Use PORT environment variable for Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
