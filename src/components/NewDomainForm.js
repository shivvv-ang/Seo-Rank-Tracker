"use client";
import axios from "axios";
import { useState } from "react";

export default function NewDomainForm({onNew}){
    const [domain , setDomain] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        axios.post('/api/domains',{domain});
        onNew();
        setDomain("");
    }
    return (
        <form className="flex gap-3 mb-8" onSubmit={handleSubmit}>
            <input
                value={domain}
                onChange={(e)=>setDomain(e.target.value)}
                className="grow bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
                placeholder="Enter a new domain (e.g. yourdomain.com)"
            />
            <button
                type="submit"
                className="bg-white/90 text-gray-800 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 border border-gray-300"
            >
                Add
            </button>
        </form>
    )
}