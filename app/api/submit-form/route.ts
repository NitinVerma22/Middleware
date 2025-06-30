export async function POST(req: Request) {
  const data = await req.json();

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbzLJDK9XpT0nJYm0rILYq8eu3xXOgK2Olf9WimhfQPboIk8FCFQyKzT77gxeQrO0q26/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.text();

  return new Response(result, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

