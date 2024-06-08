import DBCONN from "../../../../dbConfig/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/users.model";

await DBCONN();
export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { verifyToken } = reqBody;

    console.log(verifyToken)

    const userVerified = await User.findOne({verifyToken: verifyToken , verifyTokenTokenExpiry: {$gt: Date.now()}})

    if (userVerified) {
        console.log(userVerified)

        userVerified.isVerified = true
        userVerified.verifyToken = undefined
        userVerified.verifyTokenTokenExpiry = undefined

        await userVerified.save()
        return NextResponse.json({ message: "Email verified sucessfully", status: 200, sucess: true });


    } else {
        return NextResponse.json({ error: "Invalid Token", status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
