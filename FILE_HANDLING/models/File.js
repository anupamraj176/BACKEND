const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ================== Schema Definition ==================
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // fixed typo (require → required)
    },
    image: {
      type: String,
    },
    tahs: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

// ================== Post Save Hook ==================
fileSchema.post("save", async function (doc) {
  try {
    console.log("✅ New document saved:", doc);

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587, // typical SMTP port
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"File Upload System" <${process.env.MAIL_USER}>`,
      to: doc.email, // send to the email stored in the document
      subject: "File Uploaded Successfully",
      html: `
        <h2>Hello ${doc.name},</h2>
        <p>Your file has been successfully uploaded.</p>
        ${
          doc.image
            ? `<p><strong>File:</strong> ${doc.image}</p>`
            : ""
        }
        <p><strong>Tag:</strong> ${doc.tahs || "N/A"}</p>
        <br/>
        <p>Thank you for using our service!</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("📧 Email sent successfully to:", doc.email);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
});

// ================== Model Export ==================
const File = mongoose.model("File", fileSchema);
module.exports = File;
