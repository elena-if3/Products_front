import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { ProductFilter } from '../form/interfaces/productFilter.interface';
import { Product } from '../form/interfaces/product.interface';
import { ProductModel } from '../models/product.model';

const BASE_URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);

  getAll(): Promise<ProductModel[]> {
    return firstValueFrom(this.http.get<any>(`${BASE_URL}/products`).pipe(map((r) => r.data)));
  }

  getFiltered(filters: ProductFilter): Promise<ProductModel[]> {
    //on creée un objet partiel de type MonType
    const params : Partial<ProductFilter> = {};

    //Si le filtre contient une donnée pour un clé précise, on la rajouter aux params
    if(filters.code) params.code = filters.code;
    if(filters.nom) params.nom = filters.nom;
    if(filters.keywords) params.keywords = filters.keywords;

    return firstValueFrom(
      this.http
        .get<any>(`${BASE_URL}/products`, { params })
        .pipe(map((r) => r.data))
    );
  }

  getOneById(id: number): Promise<ProductModel> {
    return firstValueFrom(
      this.http.get<any>(`${BASE_URL}/products/${id}`).pipe(map((r) => r.data))
    );
  }

  create(product: Product) {
    return firstValueFrom(this.http.post(`${BASE_URL}/products`, product));
  }

  update(id: number, product: Product) {
    return firstValueFrom(this.http.put(`${BASE_URL}/products/${id}`, product));
  }

  delete(id: number) {
    return firstValueFrom(this.http.delete(`${BASE_URL}/products/${id}`));
  }
}
