import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { CreateNewProduct } from './features/products/create-new-product/create-new-product';
import { EditProduct } from './features/products/edit-product/edit-product';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'products',
    component: Products,
  },
  {
    path: 'products/new',
    component: CreateNewProduct,
  },
  {
    path: 'products/edit/:id',
    component: EditProduct
  }
];
