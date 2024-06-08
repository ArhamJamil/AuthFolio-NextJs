import DBCONN from "../../../../dbConfig/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/users.model";
import jwt from "jsonwebtoken"
import {getDataFromCookie} from "../../../../utils/getCookieData"
import mongoose from "mongoose";


await DBCONN();

export async function GET(request, response) {
  try {
    
    let data = await getDataFromCookie('authToken')
    
    // console.log(data)
    
    let decodedData = jwt.decode(data.value)
    
    // console.log(decodedData)

    let fetchedUser = await User.findOne({email: decodedData.email})
    let user = {
        username: fetchedUser.username,
        email: fetchedUser.email,
        url: data.value
    }
    return NextResponse.json({data: user })

  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
