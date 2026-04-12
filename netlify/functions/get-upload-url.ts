import { Handler } from "@netlify/functions"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const CATEGORY_RE = /^[a-zA-Z0-9-]+$/

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

  let body: {
    visibility?: string
    category?: string
    filename?: string
    contentType?: string
  }

  try {
    body = JSON.parse(event.body ?? "{}")
  } catch {
    return { statusCode: 400, body: "Invalid JSON" }
  }

  const { visibility, category, filename, contentType } = body

  if (visibility !== "public" && visibility !== "private") {
    return { statusCode: 400, body: "visibility must be public or private" }
  }
  if (!category || !CATEGORY_RE.test(category)) {
    return { statusCode: 400, body: "Invalid category — use letters, numbers, hyphens only" }
  }
  if (!filename) {
    return { statusCode: 400, body: "filename is required" }
  }

  const ext = (filename.split(".").pop() ?? "jpg").toLowerCase()
  const resolvedContentType = contentType ?? "image/jpeg"
  const key = `${visibility}/${category}/${Date.now()}.${ext}`

  const client = new S3Client({
    region: process.env.NETLIFY_AWS_REGION ?? "us-east-1",
    credentials: {
      accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY ?? "",
    },
  })

  const command = new PutObjectCommand({
    Bucket: "garett.petersen.media",
    Key: key,
    ContentType: resolvedContentType,
  })

  const url = await getSignedUrl(client, command, { expiresIn: 3600 })

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, key }),
  }
}
