import { Router, Request, Response } from "express";
import { productsRepository } from "../repositories/productsRepository";
import { CodeResponsesEnum } from "../types/CodeResponsesEnum";
import { IProduct } from "../types/productType";

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
  let products: IProduct[];
  const title = req.query.title;
  if (title) {
    products = productsRepository.getProducts(title.toString());
    res.send(products);
    return;
  };
  products = productsRepository.getProducts();
  res.send(products);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = productsRepository.getProductById(productId);
  if (product) {
    res.send(product);
    return;
  };
  res.sendStatus(CodeResponsesEnum.Not_found_404);
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
  const newProduct = productsRepository.createProduct(title);
  if (newProduct) {
    res.status(CodeResponsesEnum.Created_201).send(newProduct);
  } else {
    res.sendStatus(CodeResponsesEnum.Not_found_404);
  };
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
  const result = productsRepository.updateProduct(productId, title);
  if (result) {
    res.status(CodeResponsesEnum.Ok_200).send(result);
  } else {
    res.sendStatus(CodeResponsesEnum.Not_found_404);
  };
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const result = productsRepository.deleteProduct(id);
  if (result) {
    res.sendStatus(CodeResponsesEnum.Not_content_204);
    return;
  }
  res.sendStatus(CodeResponsesEnum.Not_found_404);
});
