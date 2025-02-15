# Takon

A simple ChatGPT clone built with Next.js and the OpenRouter API.

## Description

This project is a basic implementation of a ChatGPT-like web application. It allows users to send messages to an AI model and receive responses. It uses the OpenRouter API with the `google/gemini-2.0-flash-exp:free` model.

## Features

- Chat interface with user and bot messages
- Loading indicator while waiting for a response
- Styled with Tailwind CSS
- Uses Inter font from Google Fonts

## Prerequisites

- Node.js and npm installed
- An OpenRouter API key

## Getting Started

1.  Clone the repository:

```bash
git clone [repository URL]
```

2.  Navigate to the project directory:

```bash
cd takon
```

3.  Install dependencies:

```bash
npm install
```

4.  Set the environment variable:

Create a `.env.local` file in the root directory and add your OpenRouter API key:

```
OPENROUTER_API_KEY=your_openrouter_api_key
```

5.  Run the application:

```bash
npm run dev
```

6.  Open your browser and go to `http://localhost:3000`.

## Deployment to Vercel

1.  Create a Vercel account: If you don't have one already, sign up for a Vercel account at [https://vercel.com/](https://vercel.com/).
2.  Install the Vercel CLI:

```bash
npm install -g vercel
```

3.  Create `vercel.json`: Create a `vercel.json` file in the root of your project with the following content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "OPENROUTER_API_KEY": "@openrouter_api_key"
  }
}
```

4.  Deploy the app:

```bash
vercel
```

5.  Set the environment variable: Vercel will ask you about setting environment variables. Set the `OPENROUTER_API_KEY` environment variable to your OpenRouter API key.
6.  Wait for the deployment: Vercel will build and deploy your app. Once the deployment is complete, you'll get a URL where you can access your live app.
