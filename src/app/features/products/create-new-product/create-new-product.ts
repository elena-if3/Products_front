import { Component, inject } from '@angular/core';
import { PageTitle } from "../../../shared/components/page-title/page-title";
import { ProductForm } from "../components/product-form/product-form";
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../form/interfaces/product.interface';

@Component({
  selector: 'app-create-new-product',
  imports: [PageTitle, ProductForm],
  templateUrl: './create-new-product.html',
  styleUrl: './create-new-product.css'
})
export class CreateNewProduct {
 private readonly productService = inject(ProductService);
 private readonly router = inject(Router);
 public error: string = "";

 public async create(product: Product){
  try {
    await this.productService.create(product);
    await this.router.navigate(["/products"]);
  } catch (error) {
    this.error = "Problem inserting a new product"
  };
 };
}
