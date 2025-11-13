import Link from "next/link";

export default function KeywordCard({keyword,owner,domain}){
    return (
        <div className="flex gap-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 items-center justify-between hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-xl">
           <Link href={'/domains/'+ domain+'/'+keyword} className="font-bold grow">{keyword}</Link>
           <div><div className="bg-green-100 w-48 h-[64px]"></div></div>
        </div>
    )
}