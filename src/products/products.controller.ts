import { Controller, Get } from '@nestjs/common';

@Controller('products') 
export class ProductsController {
  @Get() // ** /products
  getProducts() {
    return [{id: 1, title: 'First Product'}];
  }

}

