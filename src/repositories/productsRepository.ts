import { IProduct } from "../types/productType";

export let products: IProduct[] = [{id: 1, title: "orange"}, {id: 2, title: "tomato"}];

export const productsRepository = {
  deleteAllProducts(): void {
    products.length = 0;
  },

  getProducts(title?: string): IProduct[] {
    if (title) {
      return products.filter(p => p.title.indexOf(title) > -1);
    };
    return products;
  },

  getProductById(id: string): IProduct | null {
    const product = products.find(p => p.id === +id);
    if (product) {
      return product;
    } else {
      return null;
    };
  },

  createProduct(title: string): IProduct {
    const newProduct: IProduct = {
      title,
      id: +Date.now().toString(),
    };
    products.unshift(newProduct);
    return newProduct;
  },

  updateProduct(id: string, title: string): IProduct | null {
    const product = products.find(p => p.id === +id);
    if (product) {
      product.title = title;
      return product;
    } else {
      return null;
    };
  },

  deleteProduct(id: string): string | null {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +id) {
        products.splice(i, 1);
        return "deleted";
      };
    };
    return null;
  },
};
