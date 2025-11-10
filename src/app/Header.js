import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Logout from "@/components/Logout";

export default async function Header(){
    const session = await getServerSession(authOptions);
    const user = session?.user;
    return (
        <header className="w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-4 px-6 shadow-lg">
         <div className="max-w-5xl mx-auto flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-white shadow-2xl">
            <a href="/" className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent hover:opacity-90 transition duration-300">Seo Rank Tracker</a>
            <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-2 shadow-md backdrop-blur-md transition-all duration-300">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30"> 
                    <img src={user?.image} alt="Profile Image" className="object-cover"/></div>
                <div className="text-right leading-tight pr-2">
                    <p className="font-semibold text-white text-sm">{user?.name}</p>
                    <Logout/>
                </div>
            </div>
            </div>
        </header>
    )
}