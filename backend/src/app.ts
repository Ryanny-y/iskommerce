import express from "express";
import cookieParser from "cookie-parser";
import moduleRoutes from './modules';
import corsMiddleWare from "./config/corsConfig";
import { errorHandler } from "./utils/Errors";

const app = express();

app.use(corsMiddleWare);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/v1", moduleRoutes);

app.use(errorHandler);

export default app;