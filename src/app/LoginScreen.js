'use client';
import Image from "next/image";
import { signIn } from "next-auth/react";
import DoubleHeader from "@/components/DoubleHeader";

export default function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center text-white">
        <DoubleHeader preTitle={"Welcome Back"} mainTitle={"Login to Your Account"}/>
        <button onClick={()=>signIn("google")} className="w-full bg-white/90 hover:bg-white text-gray-800 font-medium px-6 py-3 rounded-xl border border-gray-200 flex justify-center items-center gap-3 shadow-md hover:shadow-xl transition-all duration-300">
          <Image
            src="/google.webp"
            alt="Google logo"
            width={20}
            height={20}
            className="w-5"
          />
          <span>Login with Google</span>
        </button>  
      </div>
    </div>
  );
}
