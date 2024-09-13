import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();



    const { tab ,
        staffId ,
        departmentId ,
        positionCode ,
        putDt ,
        dDt ,
        dCode ,
        dDescription ,
        dStateCode , 
        dStateCodeDesc ,
        dFinish ,
        lastChange , } = body;

    const users = await prismadb.user.create({
      data: {
        tab ,
        staffId ,
        departmentId ,
        positionCode ,
        putDt ,
        dDt ,
        dCode ,
        dDescription ,
        dStateCode , 
        dStateCodeDesc ,
        dFinish ,
        lastChange ,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[users_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
    
  ) {
    try {
      
  
      const users = await prismadb.user.findMany({
        
      });
  
      return NextResponse.json(users);
    } catch (error) {
      console.log("[users_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }