import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "google/gemini-2.0-flash-exp:free";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPENROUTER_MODEL,
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error(error);
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
