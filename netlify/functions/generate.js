export async function handler(event) {
  // 处理 CORS 预检请求
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // 只允许 POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const {
      prompt,
      templateId,
      topic,
      audience,
      tone,
      details,
      variations,
      length,
    } = JSON.parse(event.body || "{}");

    if (!(prompt || templateId || topic || details)) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        body: JSON.stringify({ error: "Missing content input" }),
      };
    }

    // 这里先做一个测试返回（不接 AI，确保 function 正常）
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        ok: true,
        content: `你刚刚发送的 prompt 是：${
          prompt ||
          `模板：${templateId || ""}，主题：${topic || ""}，受众：${
            audience || ""
          }，语气：${tone || ""}，细节：${details || ""}，长度：${
            length || ""
          }，变体数：${variations || ""}`
        }`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        error: "Server error",
        details: err.message,
      }),
    };
  }
}
