import { Domain } from "@/models/Domain";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
import * as cheerio from 'cheerio';

async function getFaviconUrl(domain){
   const response = await axios.get(`https://${domain}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const $ = cheerio.load(response.data);
    const href = $('link[rel*="icon"]').attr('href');
    
    if (!href) return `https://www.google.com/s2/favicons?domain=${domain}`;
    if (href.startsWith('http')) return href;
    if (href.startsWith('//')) return `https:${href}`;
    if (href.startsWith('/')) return `https://${domain}${href}`;
    return `https://${domain}/${href}`;
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



export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const domains = await Domain.find({ owner: session.user?.email });
    return Response.json(domains);

  } catch (error) {
    console.error("GET /api/domains error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}