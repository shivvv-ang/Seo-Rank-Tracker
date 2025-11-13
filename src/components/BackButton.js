"use client";
import { useRouter } from "next/navigation";

export default function BackButton({customClass}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl shadow-md hover:shadow-lg backdrop-blur-md ${customClass}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <span className="font-medium">Back</span>
    </button>
  );
}
