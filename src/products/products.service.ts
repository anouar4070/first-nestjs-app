import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/products';

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

}
