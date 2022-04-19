// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { ItemState } from "../../types";

const readCurrentData = (path: string) => {
  let currentData: ItemState[];
  currentData = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));

  return currentData;
};

interface Data {
  status: boolean;
  message: string;
  payload: Record<string, any>;
}

let data = { status: false, message: "Bad Method", payload: {} };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method, query } = req;
  let id: string | null = null;
  let index: number | null = null;

  if (query.id) {
    id = query.id.toString();
  }

  if (query.index) {
    index = parseInt(query.index.toString());
  }

  try {
    let currentData: ItemState[] = [];
    const dataPath = path.resolve(".", "data", "index.json");

    switch (method) {
      // Create
      case "POST":
        currentData = readCurrentData(dataPath);
        fs.writeFileSync(dataPath, JSON.stringify([...currentData, body]));
        currentData = readCurrentData(dataPath);

        // Prepare data response
        data.status = true;
        data.message = `✨ POST new ${body.id + " " + body.name}`;
        data.payload = currentData;

        res.status(200).json(data);
        break;

      // Read
      case "GET":
        currentData = readCurrentData(dataPath);

        // Prepare data response
        data.status = true;
        data.message = `🧤 GET found ${currentData.length} items`;
        data.payload = currentData;

        res.status(200).json(data);
        break;

      // Update
      case "PUT":
        if (index !== null) {
          currentData = readCurrentData(dataPath);
          currentData[index] = body;
          fs.writeFileSync(dataPath, JSON.stringify([...currentData]));
          currentData = readCurrentData(dataPath);

          // Prepare data response
          data.status = true;
          data.message = `🧶 PUT on ${
            currentData[index].id + " " + currentData[index].name
          }`;
          data.payload = currentData;

          res.status(200).json(data);
        }
        break;

      // Delete
      case "DELETE":
        if (id !== null) {
          currentData = readCurrentData(dataPath);
          currentData = currentData.filter((item: ItemState) => item.id !== id);
          fs.writeFileSync(dataPath, JSON.stringify([...currentData]));
          currentData = readCurrentData(dataPath);

          // Prepare data response
          data.status = true;
          data.message = `🧺 DELETE target ${id}`;
          data.payload = currentData;

          res.status(200).json(data);
        }
        break;

      default:
        res.status(400).json(data);
        break;
    }
  } catch (error) {
    // Something Bad must Have Happened
    data.message = "Internal Server Error";
    res.status(500).json(data);
  }
}
