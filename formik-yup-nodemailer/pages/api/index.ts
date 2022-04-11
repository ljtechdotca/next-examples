import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { Values } from "../../types";

class Message {
  from: string;
  to: string;
  subject: string;
  html: string;
  constructor(from: string, to: string, subject: string, values: Values) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = `<dl>
  <div><dt>Contacted by:</dt><dd>${values.firstName} ${values.lastName} | ${values.email}</dd></div>
  <div><dt>Booking for date:</dt><dd>${values.date}</dd></div>
  <div><dt>Group size:</dt><dd>${values.size}</dd></div>
  <div><dt>Attached message:</dt><dd>${values.message}</dd></div>
</dl>`;
  }
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {};
}

let response = {
  status: false,
  message: "Bad Method",
  data: {},
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { body, method } = req;

  try {
    if (method === "POST") {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mail = new Message(
        body.email,
        "thefirebasegod@gmail.com",
        "Nodemailer Inquiry",
        { ...body }
      );

      console.log({ mail });

      transporter.sendMail(mail, (error, info) => {
        if (error) {
          // error: Error | null
          console.log(error);
          response.message = error.message;
          res.status(400).json(response);
        } else {
          // info: SMTPTransport.SentMessageInfo
          console.log(info);
          response.status = true;
          response.message = "Successful";
          response.data = { mail };
          res.status(200).json(response);
        }
      });
    } else {
      res.status(400).json(response);
    }
  } catch (error) {
    response.message = "Internal Server Error";
    res.status(500).json(response);
  }
}
