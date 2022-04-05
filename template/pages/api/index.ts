// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  status: boolean;
  message: string;
  content: Record<string, any>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method, query } = req;

  let response: Data = {
    status: false,
    message: "Bad Method",
    content: {},
  };

  try {
    switch (method) {
      case "GET":
        response.status = true;
        response.message = "Successful GET";
        response.content = { query };
        res.status(200).json(response);
        break;
      case "POST":
        response.status = true;
        response.message = "Successful POST";
        response.content = { body };
        res.status(200).json(response);
        break;
      case "PUT":
        response.status = true;
        response.message = "Successful PUT";
        response.content = { query, body };
        res.status(200).json(response);
        break;
      case "DELETE":
        response.status = true;
        response.message = "Successful DELETE";
        response.content = { query };
        res.status(200).json(response);
        break;
      default:
        res.status(400).json(response);
        break;
    }
  } catch (error) {
    if (error instanceof Error) response.message = error.message;
    res.status(500).json(response);
  }
}
