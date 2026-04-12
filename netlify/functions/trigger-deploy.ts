import { Handler } from "@netlify/functions"

const checkAuth = (headers: Record<string, string | undefined>): boolean =>
  headers["x-site-user"] === process.env.SITE_USER &&
  headers["x-site-pass"] === process.env.SITE_PASSWORD

export const handler: Handler = async event => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  if (!checkAuth(event.headers)) {
    return { statusCode: 401, body: "Unauthorized" }
  }

  const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL
  if (!hookUrl) {
    return { statusCode: 500, body: "Build hook not configured" }
  }

  const response = await fetch(hookUrl, { method: "POST" })

  if (!response.ok) {
    return { statusCode: 502, body: "Failed to trigger deploy" }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  }
}
