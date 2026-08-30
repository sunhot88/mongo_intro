import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readSubscribers() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "請求格式錯誤。" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "請輸入正確的 Email 格式。" }, { status: 400 });
  }

  const subscribers = await readSubscribers();

  if (subscribers.some((s) => s.email === email)) {
    return Response.json({ ok: true, message: "這組 Email 已經訂閱過了。" });
  }

  subscribers.push({ email, subscribedAt: new Date().toISOString() });

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf8");

  return Response.json({ ok: true });
}
