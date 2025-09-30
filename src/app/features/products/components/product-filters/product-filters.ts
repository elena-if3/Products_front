import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormFactory } from '../../form/productForm.factory';
import { ProductFilter } from '../../form/interfaces/productFilter.interface';

@Component({
  selector: 'app-product-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.css',
})
export class ProductFilters {
  private readonly productFormFactory = inject(ProductFormFactory);
  public productFilterForm = this.productFormFactory.createFilterForm();

  @ViewChild('productFilters') productFilters!: ElementRef;
  @Output() productFilterChanged = new EventEmitter<ProductFilter>();

  public submitForm() {
    if (this.productFilterForm.valid) {
      this.productFilterChanged.emit(this.productFilterForm.getRawValue());
    }
  }
}
