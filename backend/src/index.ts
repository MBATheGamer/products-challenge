import cors from "cors";
import experss from "express";
import { routes } from "./routes";

const app = experss();
const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

routes(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
