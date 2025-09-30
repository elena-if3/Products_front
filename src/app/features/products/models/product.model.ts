import { Product } from '../form/interfaces/product.interface';

export class ProductModel implements Product {
  id: number = 0;
  code: string = '';
  nom: string = '';
  description: string = '';
  keywords: string = '';
  kcal: number = 0;
}
