import { Component, inject, OnInit } from '@angular/core';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { ProductFilters } from './components/product-filters/product-filters';
import { ProductService } from './services/product.service';
import { ProductModel } from './models/product.model';
import { handleError } from '../../core/tools/errorHandler';
import { ProductFilter } from './form/interfaces/productFilter.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [PageTitle, ProductFilters],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  public productList: ProductModel[] | undefined = [];
  public error: string = '';

  async ngOnInit() {
    this.getAllProducts();
  }

  private async getAllProducts() {
    const response = await this.productService.getAll().catch(handleError);

    if (response) this.productList = response;
    else this.error = 'Problem while retrieving the product list...';
  }

  async getFilteredProducts(filters: ProductFilter) {
    const response = await this.productService.getFiltered(filters);

    if (response) this.productList = response;
    else this.error = 'Problem while retrieving the filtered products...';
  }

  public view(id: number) {
    this.router.navigate([`products/${id}`]);
  }

  public edit(id: number) {
    this.router.navigate([`products/edit/${id}`]);
  }

  public async delete(id: number) {
    try {
      await this.productService.delete(id);
      await this.getAllProducts();
    } catch (error) {
      this.error = 'An error has occurred...';
    }
  }
}
