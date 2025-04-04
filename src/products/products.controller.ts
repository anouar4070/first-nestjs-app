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
import { ProductsService } from './products.service';
import { Product } from 'src/interfaces/products';



@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {

  }

  @Get() // ** /products
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id') // ** /products/:id
  // getProductsById(@Req() req: Request) {
  //   console.log(req.params)
  //   return this.products.filter(product => product.id === +req.params.id) ;
  // }
  getProductsById(@Param('id') id: string) {
    const product = this.productsService.getProducts().find((product) => product.id === +id);
    if (product) {
      return product;
    }

    return 'Product not found';
  }

  @Post()
  addProduct(@Req() req: Request): Product {
    const { id, ...productData } = req.body; // Delete existing id
    const createdProduct = { id: this.productsService.getProducts().length + 1, ...productData };
    this.productsService.getProducts().push(createdProduct);
    return createdProduct;
  }

  @Delete(':id') // ** /products/:id
  remove(@Param('id') id: string) {
    return this.productsService.getProducts().filter((product) => product.id !== +id);
  }

  @Put(':id') // ** /products/:id
  update(@Param('id') id: string, @Body() body: Product): Product | string {
    const index = this.productsService.getProducts().findIndex((product) => product.id === +id);
    if (index !== -1) {
      const updatedProduct = body;
      this.productsService.getProducts()[index] = { ...this.productsService.getProducts()[index], ...updatedProduct };
      return this.productsService.getProducts()[index];
    }

    return 'Product not found';
  }
}
