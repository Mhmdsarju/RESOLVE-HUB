import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ResolveHub Server Running 🚀",
    });
});

export default app;