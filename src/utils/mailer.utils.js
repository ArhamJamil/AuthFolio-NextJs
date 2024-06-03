import User from "@/models/users.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import DBCONN from "@/dbConfig/dbConn";

DBCONN();

const sendEmail = async ({ emailTo, emailType, userID }) => {
  try {
    const hashedToken = await bcrypt.hash(userID.id.toString(), 10);

    let htmlBody;
    const domain = process.env.DOMAIN_NAME;
    const port = process.env.DOMAIN_PORT;
    const url = `${domain}:${port}`;
    console.log(userID);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenTokenExpiry: Date.now() + 3600000 * 6, // 6 hour
        },
      });

      htmlBody = `
        <h1>Email Verification</h1>
        <p>Please verify your email by clicking the link below:</p>
        <hr>
        <h3> Token : ${hashedToken} </h3>
        <a href=${url}/verify?token=${hashedToken}">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
      `;
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000 * 6, // 6 hour
        },
      });

      htmlBody = `
        <h1>Password Reset</h1>
        <p>Please reset your password by clicking the link below:</p>
        <hr>
        <h3> Token : ${hashedToken} </h3>
        <a href="$${url}/resetpassword?token=${hashedToken}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `;
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: process.env.EMAIL_AUTH_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_NAME,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: "codewitharham.remote@gmail.com",
      to: emailTo,
      subject: `${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      }`,
      html: htmlBody,
    };

    const message = await transporter.sendMail(mailOptions);
    console.log("Message sent: ", message.messageId);
    return message;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendEmail;
