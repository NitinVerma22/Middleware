export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzLJDK9XpT0nJYm0rILYq8eu3xXOgK2Olf9WimhfQPboIk8FCFQyKzT77gxeQrO0q26/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    // Google Apps Script sometimes returns HTML (error page) → so safely parse:
    const text = await response.text();

    // Try to parse JSON safely
    try {
      const json = JSON.parse(text);
      return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } catch {
      // If not JSON, return as plain text
      return new Response(text, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain",
        },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: error }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
