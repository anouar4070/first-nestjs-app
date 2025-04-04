import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/products';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
private products: Product[] = [
    { id: 1, title: 'First Product' },
    { id: 2, title: 'Second Product' },
    { id: 3, title: 'Third Product' },
  ];

getProducts() {
  return this.products;
}

getSingleProduct(id: number): Product | string{
  const product = this.products.find((product) => product.id === +id);
  if (product) {
    return product;
  }

  return 'Product not found';
}

// * Using Omit
// createNew(product: Omit<Product, 'id'>) {
//   const newProduct = {
//     id: this.products.length + 1,
//     ...product,
//   };
//   this.products.push(newProduct);
//   return newProduct;
// }

createNew(product: CreateProductDto) {
  const newProduct = {
    id: this.products.length + 1,
    ...product,
  };
  this.products.push(newProduct);
  return newProduct;
}

//* second method without use of Omit
// createNew(product: Product) {
//   product.id = this.products.length + 1;
//   this.products.push(product);
// }

updateProduct(id: number, updatedProduct: Product) {
  const index = this.products.findIndex((product) => product.id === +id);
  if (index !== -1) {
    this.products[index] = { ...this.products[index], ...updatedProduct };
    return this.products[index];
  }

  return 'Product not found';
}

deleteProduct(id: number) {
   return this.products.filter((product) => product.id !== +id);
}

}
