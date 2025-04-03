import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

interface Product {
  id: number;
  title: string;
}

@Controller('products')
export class ProductsController {
  private products: Product[] = [
    { id: 1, title: 'First Product' },
    { id: 2, title: 'Second Product' },
    { id: 3, title: 'Third Product' },
  ];

  @Get() // ** /products
  getProducts() {
    return this.products;
  }

  @Get(':id') // ** /products/:id
  // getProductsById(@Req() req: Request) {
  //   console.log(req.params)
  //   return this.products.filter(product => product.id === +req.params.id) ;
  // }
  getProductsById(@Param('id') id: string) {
    const product = this.products.find((product) => product.id === +id);
    if (product) {
      return product;
    }

    return 'Product not found';
  }

  @Post()
  addProduct(@Req() req: Request): Product {
    const { id, ...productData } = req.body; // Delete existing id
    const createdProduct = { id: this.products.length + 1, ...productData };
    this.products.push(createdProduct);
    return createdProduct;
  }

  @Delete(':id') // ** /products/:id
  remove(@Param('id') id: string) {
    return this.products.filter((product) => product.id !== +id);
  }

  @Put(':id') // ** /products/:id
  update(@Param('id') id: string, @Body() body: Product): Product | string {
    const index = this.products.findIndex((product) => product.id === +id);
    if (index !== -1) {
      const updatedProduct = body;
      this.products[index] = { ...this.products[index], ...updatedProduct };
      return this.products[index];
    }

    return 'Product not found';
  }
}
