"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setError("請輸入正確的 Email 格式，例如 name@example.com。");
      return;
    }

    setStatus("success");
    setError("");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-sm border border-ink/10 bg-forest/5 px-6 py-8 text-center">
        <p className="font-serif text-xl text-ink">謝謝您的關注！</p>
        <p className="mt-2 text-sm text-ink/60">
          請等待好消息，開賣時我們會盡快通知您。
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 sm:flex-row sm:gap-0"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="輸入您的 Email"
          aria-invalid={status === "error"}
          className={`w-full border bg-cream px-5 py-3.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none sm:rounded-l-full sm:border-r-0 ${
            status === "error"
              ? "border-rust focus:border-rust"
              : "border-ink/20 focus:border-ink"
          }`}
        />
        <button
          type="submit"
          className="rounded-full bg-rust px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink sm:rounded-l-none sm:rounded-r-full"
        >
          通知我開賣
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-center text-xs text-rust">{error}</p>
      )}
      <p className="mt-3 text-center text-xs text-ink/40">
        我們只會用來通知開賣消息，不會有其他用途。
      </p>
    </div>
  );
}
