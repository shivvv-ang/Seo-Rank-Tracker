import { Domain } from "@/models/Domain";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
const DomParser = require("dom-parser").default;

async function getFaviconUrl(domain){
   const response = await axios.get(`https://`+domain);
   const parser = new DomParser();
   const parsedHtml = parser.parseFromString(response.data,'text/html');
   const links = parsedHtml.getElementsByTagName('link');
   let href ='';
   for(const link of links){
      const rel = link.attributes?.find(a => a.name === 'rel')?.value || '';
      if(rel.includes('icon')){
         href =  link.attributes?.find(a => a.name === href)?.value;
      }
   }
  if(href.includes('://')){
    return href;
  }else{
   return `https://` + domain + href;
  }
}

export async function POST(req){
   try {
      const data = await req.json();

      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI);
      }
      
      const session = await getServerSession(authOptions);

      if (!session) {
         return Response.json({ error: "Unauthorized" }, { status: 401 });
       }

      let icon = null;
      
      icon = await getFaviconUrl(data?.domain);

      const domain = await Domain.create({
         domain: data?.domain,
         owner: session?.user?.email,
         icon: icon,
       });

      return Response.json({ success: true, domain });
   } catch (error) {
      console.error("POST /api/domains error:", error);
      return Response.json({ error: error.message }, { status: 500 });
   }
}