import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { verify } from "crypto";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try{
        const {email, password } = await request.json();
        console.log("email", email);
        console.log("password", password);

        const user = await User.findOne({email});
        if (!user){
            return NextResponse.json({ message: "Invalid email" }, { status: 400 });
        }
        console.log("user", user);

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword){
            return NextResponse.json({ message: "Invalid password", success: true }, { status: 400 });
        }

        const tokenData = {
            userId: user._id,
            email: user.email,
            username: user.username
        }

        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response =  NextResponse.json({ message: "Login successful"}, { status: 200 });

        response.cookies.set("token", token, {httpOnly: true,});

        return response;


    } catch(error){
        console.log("error verifying email", error);
        return NextResponse.json({ message: "error verifying email" }, { status: 500 });
    }
}