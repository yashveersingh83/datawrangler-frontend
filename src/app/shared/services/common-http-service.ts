import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Base } from '../serializer';
import { KeycloakAuthService } from '../../features/authentication/services/keycloak-auth.service';

// Define InjectionTokens for URL and Endpoint
export const BASE_URL = new InjectionToken<string>('BaseUrl');
export const BASE_ENDPOINT = new InjectionToken<string>('BaseEndpoint');

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends Base> {

  constructor(
    private httpClient: HttpClient,
    @Inject(BASE_URL) private url: string, 
    @Inject(BASE_ENDPOINT) private endpoint: string
    
  ) { }

  
  get(pageNumber: number = 1, pageSize: number = 10): Observable<T[]> {
    // const queryParams = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    // return this.httpClient
    //   .get<T[]>(`${this.url}/${this.endpoint}${queryParams}`)
    //   .pipe(retry(2), catchError(this.handleError));
    const queryParams = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpClient
      .get<T[]>(`${this.url}/${this.endpoint}`)
      .pipe(retry(0), catchError(this.handleError));
  }

  getById(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item))
      .pipe(retry(2), catchError(this.handleError));
  }

  update(item: T): Observable<T> {
    
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}/${item.id}`, JSON.stringify(item))
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(item: T): Observable<T> {
    return this.httpClient
      .delete<T>(`${this.url}/${this.endpoint}/${item.id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getByCustomPath<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${this.endpoint}/${path}`).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
