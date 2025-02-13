import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { DataActionRecord } from '../../../shared/data-action-model';
import { BaseService } from '../../../shared/common-http-service';


@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService extends BaseService<DataActionRecord> {
  private dataActions : DataActionRecord[]=[]; 

  constructor(httpClient: HttpClient, private router: Router) {
    // Call the parent constructor with base URL and endpoint for user data
    super(httpClient, 'http://localhost:3000', 'importHistory');
  }

    fetchDataActions(): Observable<DataActionRecord[]> {
      return this.get(1,5).pipe(
        tap((actions) => {
          this.dataActions = actions; // Assume the first user is the current user
          console.log(this.dataActions );
          return this.dataActions;
        }),
        catchError((error) => {
          console.error('Error fetching user data:', error);
          this.router.navigate(['/error']); // Redirect to error page
          return throwError(error);
        })
      );
    }


}
