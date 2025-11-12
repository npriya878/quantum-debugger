import { Universe, QuantumResponse } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are the Quantum Debugger AI - a debugging assistant that exists across multiple parallel universes. When given buggy code, you generate 5 different "quantum timeline" solutions, each from a different universe with different programming philosophies.

YOUR RESPONSE FORMAT:
For each bug provided, generate exactly 5 solutions in this format:

🌌 UNIVERSE 1: [Universe Name]
Philosophy: [Brief description of this universe's coding philosophy]
Approach: [One-line summary]
Code Solution:
\`\`\`[language]
[Fixed code here]
\`\`\`
Chaos Rating: [1-10] ⚡
Trade-offs: [What this solution sacrifices]

[Repeat for Universes 2-5]

🎲 RECOMMENDATION: [Which universe to merge with and why]

---

UNIVERSE TYPES (use these):
1. **The Elegant Universe** - Clean, minimal, best practices
2. **The Cursed Timeline** - Works but makes senior devs cry
3. **The Performance Dimension** - Speed above all else
4. **The Over-Engineered Realm** - Enterprise patterns, maximum abstraction
5. **The Chaos Dimension** - Creative, weird, surprisingly functional

RULES:
- Each solution MUST actually fix the bug
- Solutions should be genuinely different approaches
- Include humor but stay technically accurate
- Chaos Rating reflects how unconventional the approach is (1=conventional, 10=insane)
- Trade-offs must be real technical considerations
- Keep code snippets concise but complete`;

export async function generateQuantumSolutions(
  language: string,
  bugDescription: string,
  code: string,
  errorMessage: string,
  context: string
): Promise<Universe[]> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
  }

  const userPrompt = `QUANTUM DEBUG REQUEST

Language: ${language}
Bug Description: ${bugDescription}

Code:
\`\`\`${language}
${code}
\`\`\`

Error Message: ${errorMessage || 'None provided'}

Context: ${context}

Generate 5 parallel universe solutions following the Quantum Debugger format.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: SYSTEM_PROMPT
            }
          ]
        },
        contents: [
          {
            parts: [
              {
                text: userPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;
      throw new Error(`Gemini API error: ${errorMessage}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }

    const text = data.candidates[0].content.parts[0].text;

    return parseQuantumResponse(text, language);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate quantum solutions');
  }
}

function parseQuantumResponse(text: string, language: string): Universe[] {
  const universes: Universe[] = [];

  const universeRegex = /🌌 UNIVERSE \d+: (.+?)\nPhilosophy: (.+?)\nApproach: (.+?)\nCode Solution:\s*```[\w]*\n([\s\S]+?)```\s*Chaos Rating: (\d+)[^\n]*\nTrade-offs: (.+?)(?=\n\n🌌|\n\n🎲|$)/g;

  let match;
  while ((match = universeRegex.exec(text)) !== null) {
    universes.push({
      name: match[1].trim(),
      philosophy: match[2].trim(),
      approach: match[3].trim(),
      code: match[4].trim(),
      language: language,
      chaosRating: parseInt(match[5]),
      tradeoffs: match[6].trim(),
    });
  }

  return universes;
}
