"use client";
import NewDomainForm from "@/components/NewDomainForm";
import DomainList from "@/components/DomainList";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
   const [domains,setDomains] = useState([]);
   const [loading,setLoading] = useState(false);

   const fetchDomains = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/domains');
      setDomains(res.data);
    } catch (err) {
      console.error("Error fetching domains:", err);
    } finally {
      setLoading(false);
    }
  }, []);

   useEffect(()=>{
      fetchDomains()
   },[fetchDomains]);

      
  return (
    <div className="min-h-screen  bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 py-12 px-6">
      <div className="w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <NewDomainForm onNew={fetchDomains}/>
        {loading && <div className="flex flex-col items-center justify-center py-10 space-y-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                      </div>
                      <p className="text-sm text-white/70 font-medium animate-pulse">Fetching your domains...</p>
                    </div>}
        {!loading && (<DomainList domains={domains}/>)}
      </div>
    </div>
  );
}
 