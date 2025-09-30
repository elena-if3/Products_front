import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductFilter } from './interfaces/productFilter.interface';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductFormFactory {
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public createFilterForm(data?: Partial<ProductFilter>) {
    return this.fb.group({
      code: this.fb.control(data?.code, [Validators.minLength(2)]),
      nom: this.fb.control(data?.nom, [Validators.minLength(2)]),
      keywords: this.fb.control(data?.keywords, [Validators.minLength(3)]),
    });
  }

  public createForm(data?: Partial<Product>) {
    return this.fb.group({
      code: this.fb.control(data?.code, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      nom: this.fb.control(data?.nom, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      description: this.fb.control(data?.description, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255),
      ]),
      keywords: this.fb.control(data?.keywords, [
        Validators.minLength(3),
        Validators.maxLength(250),
      ]),
      kcal: this.fb.control(data?.kcal, [Validators.required, Validators.pattern(/^\d{1,4}$/)]),
    });
  }
}
