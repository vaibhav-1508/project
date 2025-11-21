import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-pro-preview-03-25'; // Fallback to gemini-pro

export async function POST(request: Request) {
    console.log('API Route called');
    console.log('Key configured:', !!GEMINI_API_KEY);
    if (GEMINI_API_KEY) {
        console.log('Key length:', GEMINI_API_KEY.length);
        console.log('Key start:', GEMINI_API_KEY.substring(0, 4));
    }

    if (!GEMINI_API_KEY) {
        return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    try {
        const { prompt, systemPrompt } = await request.json();

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: systemPrompt || 'You are a helpful assistant.' }] },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            return NextResponse.json({ error: 'Failed to fetch from Gemini' }, { status: response.status });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis failed.';

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
