import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { PORT } from "./config/env";

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});