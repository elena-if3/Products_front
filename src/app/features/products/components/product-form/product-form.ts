import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormFactory } from '../../form/productForm.factory';
import { Product } from '../../form/interfaces/product.interface';
import { hasMaxLengthError, hasMinLengthError, isRequired } from '../../../../core/tools/formValidator.validator';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit, OnChanges {
  private readonly productFormFactory = inject(ProductFormFactory);
  public productForm = this.productFormFactory.createForm();
  public productControls = this.productForm.controls;

  @Input() product?: Product;
  @Output() productFormChanged: EventEmitter<Product> = new EventEmitter();

  ngOnInit() {
    console.log('Product value: ', this.product);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue) {
      this.productForm.patchValue({ ...this.product });
    }
  }

  public submitForm() {
    if (this.productForm.valid) {
      this.productFormChanged.emit(this.productForm.getRawValue());
    } else this.productForm.markAllAsTouched();
  }

  protected readonly isRequired = isRequired;
  protected readonly hasMinLengthError = hasMinLengthError;
  protected readonly hasMaxLengthError = hasMaxLengthError;
}
