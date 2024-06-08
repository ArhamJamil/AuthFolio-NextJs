import DBCONN from "../../../../dbConfig/dbConn";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/users.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDataFromCookie } from "../../../../utils/getCookieData";
import { cookies } from "next/headers";

await DBCONN();

export async function POST(request) {
  try {
    // Parsing request body
    const { password, Npassword } = await request.json();
    
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

    // Comparing the current password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, fetchedUser.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Current password does not match", status: 400 });
    }

    // Hashing the new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(Npassword, salt);
    
    // Updating the user's password
    fetchedUser.password = newHashedPassword;
    await fetchedUser.save();
    // Deleting the authToken cookie upon successful password update
    await cookies().delete("authToken");

    return NextResponse.json({ message: "User password updated successfully", status: 200 });

  } catch (error) {
    console.error("Error updating user password:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
