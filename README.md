# AI Content Generator

An AI-powered content generation web application that uses Google's Gemini API to generate high-quality blog posts, summaries, and social media content.

## Features

- Generate AI-powered blog posts
- Generate concise summaries
- Generate social media captions and hashtags
- Gemini AI integration
- Input validation
- API rate limiting
- Copy generated content
- Responsive and modern UI
- REST API with Express.js

## Technologies

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Gemini API
- Express Validator
- Express Rate Limit
- dotenv

## Project Structure

```text
ai-content-generator/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the project

```bash
cd ai-content-generator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
```

### 5. Start the application

```bash
npm run dev
```

Open:

```text
http://localhost:5000
```

## API

### Health Check

```text
GET /api/health
```

### Generate Content

```text
POST /api/generate
```

Example request:

```json
{
  "type": "blog",
  "topic": "Benefits of Artificial Intelligence in Education"
}
```

## Security

API keys are stored in environment variables and are not included in the source code.

The `.env` file is excluded from Git using `.gitignore`.

## Author

Built as a full-stack AI portfolio project using Node.js, Express and Gemini API.