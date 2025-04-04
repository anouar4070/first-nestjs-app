import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { Product } from 'src/interfaces/products';
import { CreateProductDto } from './dto/create-products.dto';



@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {

  }

  @Get() // ** /products
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id') // ** /products/:id

  //* use of req from express
  // getProductsById(@Req() req: Request) {
  //   console.log(req.params)
  //   return this.products.filter(product => product.id === +req.params.id) ;
  // }

  //* without Pipe
  // getProductsById(@Param('id') id: string) {
  //   return this.productsService.getSingleProduct(+id)
  // }
  //* using Pipe
  getProductsById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getSingleProduct(id)
  }

  @Post()
  @UsePipes(ValidationPipe) // ✅ Apply validation to the request body 
  addProduct(@Body() createProductDto: CreateProductDto): Product {
   return this.productsService.createNew(createProductDto)
  }

  @Delete(':id') // ** /products/:id
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id)
  }

  @Put(':id') // ** /products/:id
  update(@Param('id') id: string, @Body() body: Product): Product | string {
    return this.productsService.updateProduct(+id, body)
  }
}
