import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = '/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  // private options1 = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

  // private options1 = { headers: new HttpHeaders({'Content-Type': 'multipart/form-data', 'Accept': '*/*'}) };
  private options1 = { headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY', 'Accept': '*/*'}) };
  // private options1 = { headers: new HttpHeaders().set('Content-Type', 'undefined') };

  constructor(private http: HttpClient) { }

  /**
  * GET
  * @param {string} path Path
  * @param {HttpParams} params Api params
  * @return {Observable<any>}
  */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(API_URL + path, { params })
      .pipe(catchError(this.handleError));
  }

  /**
  * POST
  * @param {string} path Path
  * @param {Obejct} body request body
  * @return {Observable<any>} http response
  */
  post(path: string, body: object = {}): Observable<any> {
    return this.http
      .post(API_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.handleError));
  }

  /**
  * POST
  * @param {string} path Path
  * @param {Obejct} body request body
  * @return {Observable<any>} http response
  */
  postFile(path: string, body: object = {}): Observable<any> {
    return this.http
      .post(API_URL + path, body, this.options1)
      .pipe(catchError(this.handleError));
  }

  /**
  * PUT
  * @param {string} path Path
  * @param {Obejct} body request body
  * @return {Observable<any>}
  */
  put(path: string, body: object = {}): Observable<any> {
    return this.http
      .put(API_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.handleError));
  }


  /**
  * DELETE
  * @param {string} path Path
  * @return {Observable<any>}
  */
  delete(path: string): Observable<any> {
    return this.http.delete(API_URL + path).pipe(catchError(this.handleError));
  }

  /**
  * Error handling
  * @param {any} error
  * @return {Observable<any>}
  */
  handleError(error: any): Observable<any> {
    return throwError(error.error);
  }
}
