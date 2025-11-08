import DomainCard from "@/components/DomainCard";
import DoubleHeader from "@/components/DoubleHeader";
import NewDomainForm from "@/components/NewDomainForm";

export default function Home() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 py-12 px-6">
      <div className="w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        <NewDomainForm/>
        <DoubleHeader preTitle={"Your Domains"} mainTitle={"4 Domains"}/>
        <div className="space-y-4 mt-6">
          <DomainCard/>
          <DomainCard/>
          <DomainCard/>
        </div>
      </div>
    </div>
  );
}
