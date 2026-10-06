import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { body, validationResult } from "express-validator";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_8
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rate limiter
const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// Home route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Content Generator API is running"
  });
});

// Generate content
app.post(
  "/api/generate",
  generateLimiter,

  [
    body("type")
      .isIn(["blog", "summary", "social"])
      .withMessage("Invalid content type"),

    body("topic")
      .trim()
      .notEmpty()
      .withMessage("Topic is required")
      .isLength({ min: 3, max: 500 })
      .withMessage("Topic must be between 3 and 500 characters")
  ],

  async (req, res) => {
    try {
      // Validation errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { type, topic } = req.body;

      let prompt = "";

      if (type === "blog") {
        prompt = `
You are a professional blog writer.

Create a high-quality blog post about:

"${topic}"

Requirements:
- Create an attractive title
- Use clear headings
- Write an engaging introduction
- Provide useful and informative content
- Use simple professional English
- Include a conclusion
- Do not mention that AI generated the content
`;
      }

      if (type === "summary") {
        prompt = `
You are an expert summarizer.

Summarize the following topic/content:

"${topic}"

Requirements:
- Keep the important information
- Remove unnecessary details
- Use simple and clear English
- Use bullet points when useful
- Keep the summary concise
`;
      }

      if (type === "social") {
        prompt = `
You are a professional social media content creator.

Create social media content about:

"${topic}"

Requirements:
- Write an engaging caption
- Make it suitable for LinkedIn, Instagram and Facebook
- Include a strong opening
- Include a clear call to action
- Add 5 relevant hashtags
- Keep it professional and engaging
`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 1200
        }
      });

      res.json({
        success: true,
        type,
        content: response.text
      });

    } catch (error) {
      console.error("Gemini API Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to generate content. Please try again."
      });
    }
  }
);

// Serve frontend
// Serve frontend

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});

// At the bottom of server.js:
export default app; // If using ES Modules ("type": "module" in package.json)

// OR if using CommonJS:
// module.exports = app;