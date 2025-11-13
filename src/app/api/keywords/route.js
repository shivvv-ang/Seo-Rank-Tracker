import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Keyword } from "@/models/Keyword";

export async function POST(req){
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const keywordDoc = await Keyword.create({
        domain:data.domain,
        keyword:data.keyword,
        owner:session.user.email,
    })
    return Response.json(keywordDoc);
}

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    const keyword = searchParams.get('keyword');
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    return Response.json(await Keyword.find(keyword ? {domain,keyword,owner:session.user.email} : {domain,owner:session.user.email}))
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const keyword = searchParams.get('keyword');
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    await Keyword.deleteOne({domain,keyword,owner:session.user.email});
    return Response.json(true);
  }