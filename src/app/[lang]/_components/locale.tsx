"use client";

import Link from "next/link";

export default function Locale() {
  return (
    <>
      <Link
        href={"/en-US"}
        className="rounded bg-primary-foreground p-2 font-bold text-primary"
      >
        English
      </Link>
      <Link
        href={"/hi"}
        className="rounded bg-amber-600 p-2 font-bold text-white"
      >
        Hindi
      </Link>
    </>
  );
}
