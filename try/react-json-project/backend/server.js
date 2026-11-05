const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data.json");

app.post("/api/data", (req, res) => {
  try {
    const existingData = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const newData = {
      id: existingData.length === 0
        ? 0
        : Math.max(...existingData.map(item => item.id)) + 1,
      ...req.body,
    };

    existingData.push(newData);

    fs.writeFileSync(
      filePath,
      JSON.stringify(existingData, null, 2)
    );

    res.status(201).json({
      message: "Data saved successfully",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save data",
    });
  }
});
app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});