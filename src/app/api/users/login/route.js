import DBCONN from "../../../../dbConfig/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


DBCONN();

export async function POST(request, response) {
  try {
    const reqBody = await NextRequest.json();
    const {password, email } = reqBody;

    const user = await User.findOne({email: email})

    if (!user) {
        return NextResponse.json({ error: "user does not exists", status: 400 });
    }

    const verifiedPassword = await bcrypt.compare(password, user.password)

    if (!verifiedPassword) {
        return NextResponse.json({ error: "Credentials are invalid", status: 400 });
    }

   const tokenData = {
    id: user._id,
    email: user.email
   }

    const payLoad_Data = await jwt.sign(tokenData, process.env.AUTH_TOKEN, {expiresIn: '1d'})

    const response = await NextResponse.json({message: "LoggedIn Sucessfully ", isLoggedIn: true, status: true})

    response.cookies.set("authToken", payLoad_Data, {
        httpOnly: true
    })

    return response



  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
