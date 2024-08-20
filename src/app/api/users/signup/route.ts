import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("user signed up successfully", savedUser);

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      { message: "user signed up successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error) {
    console.log("error signing up", error);
    return NextResponse.json({ message: "error signing up" }, { status: 500 });
  }
}
