import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const routes = {
  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  ordersByRestaurant: (id: string) => `/orders/restaurant/${id}`,
  ordersByProvdider: (id: string) => `/orders/provider/${id}`,
  validate: (id: string) => `/orders/validate/${id}`,
  complete: (id: string) => `/orders/complete/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService) { }

  checkout(restaurant, provider, products): Observable<any> {
    return this.apiService.post(routes.orders, {restaurant: restaurant, provider: provider, details: products});
  }

  getByRestaurant(restaurant) {
    return this.apiService.get(routes.ordersByRestaurant(restaurant));
  }

  getByProvider(provider) {
    return this.apiService.get(routes.ordersByProvdider(provider));
  }

  getSingle(id: string): Observable<any> {
    return this.apiService.get(routes.order(id));
  }

  validated(id) {
    return this.apiService.put(routes.validate(id));
  }
  completed(id) {
    return this.apiService.put(routes.complete(id));
  }
}
