import cors, { CorsOptions } from "cors";

// TODO: Add the web url of the deployed web app
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://iskommerce.vercel.app",
  "https://iskommerce-git-main-ryannys-projects.vercel.app",
  "https://iskommerce-h7odbyrhp-ryannys-projects.vercel.app",
  "https://www.iskommerce.shop"
];

const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsConfig);