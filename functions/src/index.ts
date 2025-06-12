import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Replace with your actual email credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "naiju2607@gmail.com",
    pass: "bpiy nouj vqkv kfum", // Use app password
  },
});


export const sendEnquiryEmail = onDocumentCreated(
  "contact_submissions/{submissionId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();

    const timestamp = data.timestamp?.toDate?.() || new Date();

    const mailOptions = {
      from: `"Website Enquiry" <wayanadanhuts@gmail.com>`,
      to: "naiju2607@gmail.com",
      subject: `New Enquiry from ${data.name}`,
      html: `
        <h3>New Accommodation Enquiry</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Accommodation:</strong> ${data.accommodation}</p>
        <p><strong>Check-in:</strong> ${data.checkIn}</p>
        <p><strong>Check-out:</strong> ${data.checkOut}</p>
        <p><strong>Adults:</strong> ${data.adults}, <strong>Children:</strong> ${data.children}</p>
        <p><strong>Total Guests:</strong> ${data.guests}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><em>Submitted on: ${timestamp.toLocaleString()}</em></p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  }
);