import express from "express";
import next from "next";

const port = 3000;
const app = next({ dev: true }); // whether or not to launch Next.js in dev mode
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/test", function (req, res) {
    res.json({ message: "👋 Hello World" });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`🧶 Express Server Ready on http://localhost:${port}`);
  });
});
