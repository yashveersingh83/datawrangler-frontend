import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { ManagerModel } from '../../../shared/manager-model';
import { BaseService } from '../../../shared/common-http-service';



@Injectable({
  providedIn: 'root'
})
export class ManagerService extends BaseService<ManagerModel> {
  //private dataActions : InformationRequestModel[]=[]; 

  constructor(httpClient: HttpClient, private router: Router, ) {
    // Call the parent constructor with base URL and endpoint for user data
    super(httpClient, 'http://localhost:3000', 'managers');
  }

  getManagerList(): Observable<ManagerModel[]> {
        return this.get(1,5).pipe(
          tap((actions) => {
            console.log(actions);
                      return actions;
          }),
          catchError((error) => {
            console.error('Error fetching user data:', error);
            this.router.navigate(['/error']); // Redirect to error page
            return throwError(error);
          })
        );
      }
}
