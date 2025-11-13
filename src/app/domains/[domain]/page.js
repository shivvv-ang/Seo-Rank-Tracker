"use client";
import BackButton from "@/components/BackButton";
import DeleteButton from "@/components/DeleteButton";
import DoubleHeader from "@/components/DoubleHeader";
import KeywordCard from "@/components/KeywordCard";
import NewKeywordForm from "@/components/NewKeywordForm";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function DomainPage(props){
    const [keywords,setKeywords] = useState([]);
    const [loading,setLoading] = useState(false);
    const MySwal = withReactContent(Swal)
    const { domain } = useParams(); 
    function fetchkeywords(){
        setLoading(true);
        axios.get("/api/keywords?domain="+domain).then((response)=>{
            setKeywords(response.data);
            setLoading(false)
        })
    }
    useEffect(()=>{
        fetchkeywords()
    },[])

    function deleteDomain(){
        axios.delete(`/api/domains?domain=${domain}`).then(()=>{
            redirect('/');
        });
    }

    function deletePopup(){
        MySwal.fire({
           title:"Delete?",
           text:`Do you wanna Delete ${domain}`,
           cancelButtonText:"Cancel",
           confirmButtonText:"Delete",
           confirmButtonColor:"#f00",
           showCloseButton:true,
           showCancelButton:true,
           reverseButtons:true,
           focusCancel:true,
           focusConfirm:false
          }).then((result) => {
            if (result.isConfirmed){
                deleteDomain()
            }
          })
    }
  
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 py-12 px-6">
           <BackButton customClass={"my-4"}/>
           <div className="w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <DoubleHeader preTitle={"Domain"} mainTitle={domain}/>
                    <DeleteButton onClick={deletePopup}/>
                </div>
                <NewKeywordForm domain={domain} onNew={fetchkeywords}/>
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-5">
                        <div className="relative flex space-x-2">
                        <div className="w-3.5 h-3.5 bg-white/80 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3.5 h-3.5 bg-white/80 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3.5 h-3.5 bg-white/80 rounded-full animate-bounce"></div>
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-indigo-500/40 animate-pulse"></div>
                        </div>
                        <p className="text-sm text-white/80 font-semibold tracking-wide animate-pulse">
                        Fetching your keywords...
                        </p>
                    </div>
                )}
                { !loading && keywords.length > 0 && <div className="mt-8 space-y-4">{ keywords.map(keyword=>(<KeywordCard key={keyword._id} {...keyword}/>))} </div>}
                { !loading && keywords.length === 0 && (
                    <div className="text-center py-10 text-white/80 italic animate-fadeIn">
                        No keywords found for this domain ✨
                    </div>
                )}
            </div>
        </div>
    )
}