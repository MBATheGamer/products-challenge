require("dotenv").config();

import experss from "express";
import { routes } from "./routes";

const app = experss();
const port = parseInt(process.env.PORT as string) || 8000;

routes(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
