import { Request, Response } from "express";
import { products } from './productsRepository';
import { app } from './settings'
import { CodeResponsesEnum } from "./types/CodeResponsesEnum";

const port = process.env.PORT || 3000;

app.delete('/testing/all-data', (req: Request, res: Response) => {
  products.length = 0;;
  res.send(CodeResponsesEnum.Not_content_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
