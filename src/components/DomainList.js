"use client";
import DomainCard from "./DomainCard";
import DoubleHeader from "./DoubleHeader";

export default  function DomainList({domains}){
    return (
        <>
          <DoubleHeader preTitle={"Your Domains"} mainTitle={domains.length+" Domains"}/>
          <div className="space-y-4 mt-6">
            {domains.map(domain =>(<DomainCard key={domain._id} {...domain} />))}
          </div>          
        </>
    )
}