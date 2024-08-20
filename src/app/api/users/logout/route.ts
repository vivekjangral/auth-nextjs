import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function GET(request: NextRequest) {
    try{

        const response =  NextResponse.json({ message: "Login successful" }, { status: 200 });

        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});

        return response;


    } catch(error){
        console.log("error verifying email", error);
        return NextResponse.json({ message: "error verifying email" }, { status: 500 });
    }
}
     