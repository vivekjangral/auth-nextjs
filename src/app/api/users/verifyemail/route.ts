import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { verify } from "crypto";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("token", token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: { $gt: Date.now() }})

        if (!user){
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        console.log("user", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });


    } catch(error){
        console.log("error verifying email", error);
        return NextResponse.json({ message: "error verifying email" }, { status: 500 });
    }
}
