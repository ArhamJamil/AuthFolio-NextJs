import DBCONN from "../../../../dbConfig/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/users.model";
import jwt from "jsonwebtoken";
import { getDataFromCookie } from "../../../../utils/getCookieData";

await DBCONN();

export async function POST(request) {
  try {
    // Parsing request body
    const { username } = await request.json();
    
    // Getting data from cookie
    const data = await getDataFromCookie('authToken');
    
    if (!data) {
      return NextResponse.json({ error: "No auth token found", status: 401 });
    }
    
    // Decoding JWT token
    const decodedData = jwt.decode(data.value);
    
    if (!decodedData || !decodedData.email) {
      return NextResponse.json({ error: "Invalid auth token", status: 401 });
    }

    // Finding the user by email
    const fetchedUser = await User.findOne({ email: decodedData.email });
    
    if (!fetchedUser) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    // Updating the user data
    fetchedUser.username = username;
    await fetchedUser.save();

    return NextResponse.json({ message: "User updated successfully", status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
