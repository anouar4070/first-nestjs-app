import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('products') 
export class ProductsController {
 private products: {id: number, title: string}[] = [
  {id: 1, title: 'First Product'},
  {id: 2, title: 'Second Product'},
  {id: 3, title: 'Third Product'},
];

  @Get() // ** /products
  getProducts() {
    return this.products;
  }

  @Get(':id') // ** /products/:id
  getProductsById(@Req() req: Request) {
    console.log(req.params)
    return this.products.filter(product => product.id === +req.params.id) ;
  }
}

