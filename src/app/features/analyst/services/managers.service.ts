import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ManagerModel } from '../../../shared/manager-model';
import { BaseService } from '../../../shared/services/common-http-service';
import { environment } from '../../../../environments/environment';
import { OrganizationalUnitModel } from '../../../shared/organizationalUnit-model';



@Injectable({
  providedIn: 'root'
})
export class ManagerService extends BaseService<ManagerModel> {
  //private dataActions : InformationRequestModel[]=[]; 

  constructor(httpClient: HttpClient, private router: Router, ) {
    // Call the parent constructor with base URL and endpoint for user data
    super(httpClient, environment.apiUrl, 'Manager');
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

      getContributors(): Observable<ManagerModel[]> {
        return this.getManagerList().pipe(
          map((managers: ManagerModel[]) => 
            managers.filter(manager => manager.contributorRole === true)
          ),
          tap(filtered => {
            console.log('Filtered contributors:', filtered);
          }),
          catchError(error => {
            console.error('Error filtering contributors:', error);
            this.router.navigate(['/error']);
            return throwError(error);
          })
        );
      }

      getOrgUnits(): Observable<OrganizationalUnitModel[]> {
        return this.getByCustomPath<OrganizationalUnitModel[]>('GetOrgUnits');
      }
      
}
