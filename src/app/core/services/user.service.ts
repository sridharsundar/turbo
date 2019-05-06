import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const routes = {
  users: '/users/signup',
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  register(user): Observable<any> {
    return this.apiService.post(routes.users, user);
  }
}
