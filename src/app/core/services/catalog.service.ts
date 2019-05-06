import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Catalog } from 'app/core/models';

const routes = {
  catalogs: (providerId: string) => `/providers/${providerId}/products/`,
  categories: (providerId: string) => `/categories/${providerId}/`,
  categoriesCount: (providerId: string) => `/categories/${providerId}/counts`,
  category: (providerId: string, categoryId: string) => `/categories/${providerId}/${categoryId}`,
  products: (providerId: string, categoryId: string) => `/categories/${providerId}/${categoryId}/products`,
  product: (providerId: string, categoryId: string, productId: string) => `/categories/${providerId}/${categoryId}/products/${productId}`,
  catalog: (providerId: string, productId: string) => `/providers/${providerId}/products/${productId}`
};

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private apiService: ApiService) {}

  getAll(providerId): Observable<Catalog[]> {
    return this.apiService.get(routes.catalogs(providerId));
  }

  getSingle(providerId: string, productId: string): Observable<Catalog> {
    return this.apiService.get(routes.catalog(providerId, productId));
  }

  post(providerId, catalog: Catalog): Observable<Catalog> {
    return this.apiService.post(routes.catalogs(providerId), catalog);
  }

  put(providerId: string, catalog: Catalog): Observable<Catalog> {
    return this.apiService.put(routes.catalog(providerId, catalog._id), catalog);
  }

  delete(providerId: string, productId: string) {
    return this.apiService.delete(routes.catalog(providerId, productId));
  }

  /**
  * Add Category
  */
  addCategory(providerId, category: any): Observable<Catalog> {
    return this.apiService.post(routes.categories(providerId), category);
  }

  updateCategory(providerId, categoryId, category: any): Observable<Catalog> {
    return this.apiService.put(routes.category(providerId, categoryId), category);
  }

  getCount(providerId): Observable<any[]> {
    return this.apiService.get(routes.categoriesCount(providerId));
  }

  /**
  * Get all categories and product count
  */
  getCategories(providerId): Observable<any[]> {
    return this.apiService.get(routes.categories(providerId));
  }

  /**
  *
  */
  getCategory(providerId: string, categoryId: string): Observable<any> {
    return this.apiService.get(routes.category(providerId, categoryId));
  }

  /**
  *
  */
  deleteCategory(providerId: string, categoryId: string) {
    return this.apiService.delete(routes.category(providerId, categoryId));
  }

  addProduct(providerId, categoryId, data): Observable<Catalog> {
    return this.apiService.post(routes.products(providerId, categoryId), data);
  }

  editProduct(providerId, categoryId, productId, data): Observable<Catalog> {
    return this.apiService.put(routes.product(providerId, categoryId, productId), data);
  }

  deleteProduct(providerId, categoryId, productId) {
    return this.apiService.delete(routes.product(providerId, categoryId, productId));
  }


}
