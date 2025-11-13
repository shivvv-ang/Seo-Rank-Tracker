"use client";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import BackButton from "@/components/BackButton";
import DoubleHeader from "@/components/DoubleHeader";
import KeywordCard from "@/components/KeywordCard";
import DeleteButton from "@/components/DeleteButton";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function KeywordPage() {
  const { domain, keyword } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const fetchKeywordDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/keywords?keyword='+keyword+'&domain='+domain);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching keyword details:", err);
    } finally {
      setLoading(false);
    }
  }, [domain, keyword]);

  useEffect(() => {
    fetchKeywordDetails();
  }, [fetchKeywordDetails]);

  async function deleteKeyword() {
    const urlParams = '?domain='+domain+'&keyword='+encodeURIComponent(keyword);
    const url = '/api/keywords'+urlParams;
    await axios.delete(url);
     redirect('/domains/'+domain);
  }

  function showDeletePopup() {
    MySwal.fire({
      title: 'Delete?',
      text: `Do you want to delete keyword "${keyword}"?`,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#f00',
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,
      focusCancel: true,
      focusConfirm: false,
    }).then(result => {
      if (result.isConfirmed) {
        deleteKeyword();
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 py-10 px-6 text-white">
      <BackButton customClass={"my-4"} />
      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

      <div className="flex items-center justify-between mb-6">
        <DoubleHeader preTitle={domain} mainTitle={keyword} />
        <DeleteButton onClick={showDeletePopup} />
      </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
            </div>
            <p className="text-sm text-white/70 font-medium animate-pulse">
              Loading keyword insights...
            </p>
          </div>
        )}

        {!loading && data && (
          <div className="mt-8 space-y-4">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => <KeywordCard key={item._id} {...item} />)
            ) : (
              <p className="text-white/70 text-center italic">
                No keyword data available for <span className="font-semibold">{keyword}</span>.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
