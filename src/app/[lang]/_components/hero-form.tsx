"use client";

import { subscribe } from "../_actions/hero-form";
export default function HeroForm({ submitBtnText }: { submitBtnText: string }) {
  return (
    <form
      action={subscribe}
      className="grid w-full max-w-[550px] grid-cols-1 items-center rounded lg:grid-cols-3 lg:border lg:border-solid lg:border-slate-400"
    >
      <label className="lg:col-span-2">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="form-input w-full rounded bg-transparent py-5 lg:border-none"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded bg-[#FDB71C] p-4 font-bold text-primary lg:col-span-1 lg:mt-0 lg:h-[90%] lg:w-[98%] lg:p-2"
      >
        {submitBtnText}
      </button>
    </form>
  );
}
