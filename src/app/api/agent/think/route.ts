export async function POST(request: Request) {
  const body = await request.json();
  const { strategy, tokenPair, riskLevel, context } = body;

  const systemPrompt = `You are an AI trading agent on Robinhood Chain (Arbitrum L2).
You make decisions based on market context provided to you.
Your strategy type is: ${strategy}
Risk level: ${riskLevel}
You must respond ONLY with valid JSON in this exact format:
{"action": "buy" | "sell" | "hold", "confidence": 0-100, "reason": "brief reason"}
Do not include any other text.`;

  const userPrompt = strategy === "arb"
    ? `Analyze arbitrage opportunity for ${tokenPair}. Market context: ${JSON.stringify(context)}`
    : strategy === "rebalancer"
    ? `Analyze portfolio rebalancing needs. Current holdings: ${JSON.stringify(context)}`
    : strategy === "whale"
    ? `Analyze whale wallet activity. Recent transactions: ${JSON.stringify(context)}`
    : strategy === "sniper"
    ? `Analyze new token launch opportunity. Token data: ${JSON.stringify(context)}`
    : strategy === "custom"
    ? `Execute custom strategy. Context: ${JSON.stringify(context)}`
    : `Analyze market conditions. Context: ${JSON.stringify(context)}`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 150,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: "AI request failed", details: err }, { status: 500 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    try {
      const decision = JSON.parse(content);
      return Response.json(decision);
    } catch {
      return Response.json({ action: "hold", confidence: 50, reason: "Unable to parse AI response" });
    }
  } catch (error) {
    return Response.json({ action: "hold", confidence: 0, reason: "AI service unavailable" }, { status: 500 });
  }
}
