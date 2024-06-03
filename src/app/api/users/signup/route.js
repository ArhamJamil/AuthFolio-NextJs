import DBCONN from "@/dbConfig/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users.model";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer.utils";

DBCONN();

export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json({ error: "User already exists", status: 400 });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      console.log({ message: "User registered successfully", success: true, user: newUser })
      if (savedUser) {
        await sendEmail({ emailTo: email, emailType: "VERIFY", userID: newUser._id });
        
      }      
      return NextResponse.json({ message: "User registered successfully", success: true, user: newUser });
      
    }
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
