import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { password } = await request.json();

  if (password === import.meta.env.ADMIN_PASSWORD) {
    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({ ok: false }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};