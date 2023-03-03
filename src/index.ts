import { Request, Response } from "express";
import { productsRepository } from './repositories/productsRepository';
import { app } from './settings'
import { CodeResponsesEnum } from "./types/CodeResponsesEnum";

const port = process.env.PORT || 3000;

app.delete('/testing/all-data', (req: Request, res: Response) => {
  productsRepository.deleteAllProducts();
  res.send(CodeResponsesEnum.Not_content_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
