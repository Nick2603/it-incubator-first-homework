import { Router, Request, Response } from "express";
import { products } from "../productsRepository";
import { CodeResponsesEnum } from "../types/CodeResponsesEnum";

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
  if (req.query.title) {
    const title = req.query.title.toString();
    res.send(products.filter(p => p.title.indexOf(title) > -1));
  }
  res.send(products);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === +productId);
  if (product) {
    res.send(product);
  };
  res.send(CodeResponsesEnum.Not_found_404);
});

productsRouter.post('/', (req: Request, res: Response) => {
  const title = req.body.title;
  if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
    res.status(CodeResponsesEnum.Incorrect_values_400).send({
      errorsMessage: [{
        "message": "Incorrect title",
        "field": "title",
      }],
      resultCode: 1,
    });
    return;
  }
  const newProduct = {
    id: +(new Date()),
    title,
  };
  products.push(newProduct);
  res.status(CodeResponsesEnum.Created_201).send(newProduct);
});

productsRouter.put('/:id', (req: Request, res: Response) => {
  const title = req.body.title;
  if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
    res.status(CodeResponsesEnum.Incorrect_values_400).send({
      errorsMessage: [{
        "message": "Incorrect title",
        "field": "title",
      }],
      resultCode: 1,
    });
    return;
  }
  const productId = req.params.id;
  const product = products.find(p => p.id === +productId);
  if (product) {
    product.title = title;
    res.status(CodeResponsesEnum.Not_content_204).send(product);
  } else {
    res.send(CodeResponsesEnum.Not_found_404);
  };
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(CodeResponsesEnum.Not_content_204);
      return;
    };
  };
  res.send(CodeResponsesEnum.Not_found_404);
});
