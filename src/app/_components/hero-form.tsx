"use client";

import { subscribe } from "@/app/_actions/hero-form";

export default function HeroForm({ submitBtnText }: { submitBtnText: string }) {
  return (
    <form
      action={subscribe}
      className="grid w-full max-w-[550px] grid-cols-1 items-center rounded lg:border lg:border-solid lg:border-slate-400 lg:grid-cols-3"
    >
      <label className="lg:col-span-2">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="form-input w-full rounded lg:border-none bg-transparent py-5"
        />
      </label>
      <button
        type="submit"
        className="lg:col-span-1 lg:h-[90%] lg:w-[98%] rounded bg-[#FDB71C] mt-2 p-4 lg:mt-0 lg:p-2 font-bold text-primary"
      >
        {submitBtnText}
      </button>
    </form>
  );
}
