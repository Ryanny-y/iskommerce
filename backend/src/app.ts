import express from "express";
// import moduleRoutes from "./modules";
// import { errorHandler } from "./common/utils/Errors";
import cookieParser from "cookie-parser";
// import corsMiddleWare from "./config/corsConfig";
import cors from 'cors';
// import { errorHandler } from "./common/utils/Errors";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
// app.use("/api/v1", moduleRoutes);

// app.use(errorHandler);

export default app;