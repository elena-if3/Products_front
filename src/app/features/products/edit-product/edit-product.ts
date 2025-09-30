import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from "../../../shared/components/page-title/page-title";
import { ProductForm } from "../components/product-form/product-form";
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../form/interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { handleError } from '../../../core/tools/errorHandler';

@Component({
  selector: 'app-edit-product',
  imports: [PageTitle, ProductForm],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private productId: number = 0;
  public product?: Product;
  public error: string = "";

  private readonly productService = inject(ProductService);

  public async ngOnInit() {
      this.productId = this.activeRoute.snapshot.params["id"];
      this.product = await this.productService.getOneById(this.productId).catch(handleError);

      if(!this.product) {
        this.error = "Product not found"
      }
  }

  public async update(product: Product){
    try {
      await this.productService.update(this.productId, product);
      await this.router.navigate(["/products"]);
    } catch (error) {
      this.error = "Error while updating...";
    };
  };
};
