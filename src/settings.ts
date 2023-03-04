import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { videosRouter } from "./routes/videosRouter";
import { videosRepository } from "./repositories/videosRepository";
import { CodeResponsesEnum } from "./types/CodeResponsesEnum";

export const app = express();

const parserMiddleware = bodyParser.json();

app.use(parserMiddleware);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  videosRepository.deleteAllVideos();
  res.sendStatus(CodeResponsesEnum.Not_content_204);
});

app.use("/videos", videosRouter);
