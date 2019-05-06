import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators' ;

import { User } from 'app/core/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
  *
  */
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
  *
  */
  login(email: string, password: string) {
    return this.http.post<any>('api/v1/users/login', { email, password })
        .pipe(map(user => {
            if (user && user.token && user.id) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
            return user;
        }));
  }

  forgotPassword(email: string) {
    return this.apiService.post('/users/forgot-password', {email: email});
  }

  /**
  * reset user password
  */
  resetPassword(token: string, password: string) {
    return this.apiService.post('/users/reset-password', {token: token, password: password});
  }

  /**
  * Logout user
  */
  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  /**
  * Log admin
  */
  admin(email: String, password: String) {
    return this.http.post<any>('api/v1/users/login/admin', {email, password})
      .pipe(map(user => {
          if (user && user.token && user.id) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
      }));
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') != null;
  }
}
