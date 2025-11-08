"use client";

import { signOut } from "next-auth/react";

export default function Logout(){
    return (
        <button onClick={()=>signOut()} className="text-xs text-indigo-200 hover:text-white hover:underline transition duration-200">
            Logout
        </button>
    )
}