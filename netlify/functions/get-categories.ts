import { Handler } from "@netlify/functions"
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

const checkAuth = (headers: Record<string, string | undefined>): boolean =>
  headers["x-site-user"] === process.env.SITE_USER &&
  headers["x-site-pass"] === process.env.SITE_PASSWORD

export const handler: Handler = async event => {
  if (!checkAuth(event.headers)) {
    return { statusCode: 401, body: "Unauthorized" }
  }

  const visibility = event.queryStringParameters?.visibility ?? "public"
  if (visibility !== "public" && visibility !== "private") {
    return { statusCode: 400, body: "visibility must be public or private" }
  }

  const client = new S3Client({
    region: process.env.NETLIFY_AWS_REGION ?? "us-east-1",
    credentials: {
      accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY ?? "",
    },
  })

  const result = await client.send(
    new ListObjectsV2Command({
      Bucket: "garett.petersen.media",
      Prefix: `${visibility}/`,
      Delimiter: "/",
    })
  )

  const categories = (result.CommonPrefixes ?? [])
    .map(p => p.Prefix?.replace(`${visibility}/`, "").replace("/", "") ?? "")
    .filter(Boolean)
    .sort()

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categories }),
  }
}
