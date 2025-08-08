import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export const sendMail = async (to, token) => {
    
  try {
     console.log("Loaded Email:", process.env.EMAIL_USER);

    const info = await transporter.sendMail({
      from: `"Fundo App" <${process.env.EMAIL_USER}>`,
      to,
        subject: 'Password Reset Request',
      text: `
Hello,

We received a request to reset your password for your Fundo account.

Here is your password reset token:

${token}

This token will expire in 15 minutes. 
If you didn’t request this, please ignore this email.

Thanks,  
Pooja  
The Fundo Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <p>Hello,</p>
          <p>We received a request to reset your password for your Fundo account.</p>
          <p><b>Here is your password reset token:</b></p>
          <h3 style="color:#2d89ef;">${token}</h3>
          <p>This token will expire in <b>15 minutes</b>. If you didn’t request this, please ignore this email.</p>
          <p>Thanks,<br/>Pooja<br/><b>The Fundo Team</b></p>
        </div>
      `
    });
    console.log("Message sent:", info.messageId);
    console.log("Server response:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};