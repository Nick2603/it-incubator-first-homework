import express from "express";
import bodyParser from "body-parser";
import { productsRouter } from "./routes/productsRouter";

export const app = express();

const parserMiddleware = bodyParser.json();

app.use(parserMiddleware);

app.use("/products", productsRouter);

