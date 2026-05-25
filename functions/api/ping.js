export const onRequestGet = () =>
  new Response("pong", { status: 200, headers: { "Content-Type": "text/plain" } });
