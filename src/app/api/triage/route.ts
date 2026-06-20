import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, service, severity } = body;

    const systemPrompt = `
You are an expert AI Incident Triage Engine for CrisisOS.
Analyze the following incident report and output the triage result in valid JSON format ONLY. Do not include any markdown formatting like \`\`\`json or \`\`\`.

Incident Title: ${title || "Unknown"}
Description: ${description || "Unknown"}
Affected Service: ${service || "Unknown"}
Initial Reported Severity: ${severity || "Unknown"}

Output JSON Schema:
{
  "incidentType": "string (e.g. Payment API Abuse)",
  "severity": "Low" | "Medium" | "High" | "Critical",
  "riskScore": number (0-100),
  "affectedService": "string",
  "potentialImpact": "string (1-2 sentences)",
  "confidence": number (0-100),
  "recommendedRoles": ["string", "string"],
  "recommendedPlaybook": "string",
  "firstActions": ["string", "string"]
}

Triage logic rules:
- Data leak keywords increase score.
- Payment outage keywords increase score.
- Ransomware keywords increase score.
- Failed login/admin keywords increase score.
- Camera/offline keywords increase score.
- Critical/High initial severity increases score.
`;

    const res = await fetch('https://api.xiaomimimo.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XIAOMI_MIMO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mimo-v2.5',
        messages: [{ role: 'user', content: systemPrompt }]
      })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    let resultText = data.choices[0].message.content.trim();
    
    // Clean up if the model wrapped it in markdown
    if (resultText.startsWith('\`\`\`json')) {
      resultText = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    } else if (resultText.startsWith('\`\`\`')) {
      resultText = resultText.replace(/\`\`\`/g, '');
    }

    const triageResult = JSON.parse(resultText);
    return NextResponse.json(triageResult);

  } catch (error) {
    console.error("Triage Error:", error);
    return NextResponse.json({ error: 'Failed to generate triage' }, { status: 500 });
  }
}
