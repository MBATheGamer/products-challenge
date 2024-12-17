require("dotenv").config();

import experss, { Request, Response } from "express";

const app = experss();
const port = parseInt(process.env.PORT as string) || 8000;

app.get("/", (_request: Request, response: Response) => {
  response.send("Hello, World!\n");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
