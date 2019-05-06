import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Entity } from 'app/core/models';

const routes = {
  restaurants: '/restaurants',
  restaurant: (id: string) => `/restaurants/${id}`,
  profile: (id: string) => `/restaurants/${id}/profile`,
  email: (id: string) => `/restaurants/${id}/email`,
  password: (id: string) => `/restaurants/${id}/password`,
  link: '/linking/restaurant',
  request: (id) => `/linking/restaurant/${id}`,
  cancel: (res, prod) => `/linking/cancel/${res}/${prod}`,
  remove: (res, prod) => `/linking/remove/${res}/${prod}`,
  pendignRequest: (id: string) => `/linking/restaurant/${id}/pending`,
  providers: (id: string) => `/restaurants/${id}/providers`,
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Entity[]> {
    return this.apiService.get(routes.restaurants);
  }

  getSingle(id: string): Observable<Entity> {
    return this.apiService.get(routes.restaurant(id));
  }

  post(restaurant: Entity): Observable<Entity> {
    return this.apiService.post(routes.restaurants, restaurant);
  }

  put(restaurant: Entity): Observable<Entity> {
    return this.apiService.put(routes.restaurant(restaurant._id), restaurant);
  }

  delete(id: string) {
    return this.apiService.delete(routes.restaurant(id));
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

  link(id, provider) {
    return this.apiService.post(routes.link, {sender: 'RESTAURANT', restaurant: id, provider: provider});
  }
  request(id) {
    return this.apiService.get(routes.request(id));
  }

  cancel(id, provider) {
    return this.apiService.post(routes.cancel(id, provider));
  }

  remove(id, provider) {
    return this.apiService.put(routes.remove(id, provider));
  }

  providers(id) {
    return this.apiService.get(routes.providers(id));
  }
  pendignRequest(id) {
    return this.apiService.get(routes.pendignRequest(id));
  }
}
