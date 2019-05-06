import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Entity } from 'app/core/models'

const routes = {
  providers: '/providers',
  provider: (id: string) => `/providers/${id}`,
  customers: (id: string) => `/providers/${id}/customers`,
  profile: (id: string) => `/providers/${id}/profile`,
  email: (id: string) => `/providers/${id}/email`,
  password: (id: string) => `/providers/${id}/password`,
  pendignRequest: (id: string) => `/linking/provider/${id}/pending`,
  confirmRequest: (provider, restaurant) => `/linking/provider/${provider}/${restaurant}`,
  restaurants: (id: string) => `/providers/${id}/restaurants`,
};

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private apiService: ApiService) {}

  getCustomersCount(id): Observable<Entity> {
    return this.apiService.get(routes.customers(id));
  }
  getAll(): Observable<Entity[]> {
    return this.apiService.get(routes.providers);
  }

  getSingle(id: string): Observable<Entity> {
    return this.apiService.get(routes.provider(id));
  }

  post(restaurant: Entity): Observable<Entity> {
    return this.apiService.post(routes.providers, restaurant);
  }

  put(restaurant: Entity): Observable<Entity> {
    return this.apiService.put(routes.provider(restaurant._id), restaurant);
  }

  delete(id: string) {
    return this.apiService.delete(routes.provider(id));
  }

  editProfile(id, data) {
    return this.apiService.put(routes.profile(id), data);
  }

  resetEmail(id, data) {
    return this.apiService.put(routes.email(id), data);
  }
  resetPassword(id, data) {
    return this.apiService.put(routes.password(id), data);
  }

  pendignRequest(id) {
    return this.apiService.get(routes.pendignRequest(id));
  }
  confirmRequest(provider, restaurant) {
    return this.apiService.put(routes.confirmRequest(provider, restaurant));
  }

  restaurants(id) {
    return this.apiService.get(routes.restaurants(id));
  }
}
