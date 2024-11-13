import nodemailer from "nodemailer";
declare const process: any;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    console.log("------req content---", req.body);

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "toni.superstar3@gmail.com",
      subject: `New message from ${name}: ${subject}`,
      text: message + `\n\nReply to: ${email}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({
        status: "success",
        message: "Your message has been sent. Thank you!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        status: "error",
        message: "An error occurred, please try again.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
