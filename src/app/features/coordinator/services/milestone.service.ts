import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Router } from '@angular/router';
import { BaseService } from '../../../shared/common-http-service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { KeycloakAuthService } from '../../authentication/services/keycloak-auth.service';
import { MileStoneModel } from '../../../shared/milestone-model';

@Injectable({
  providedIn: 'root'
})
export class MileService extends BaseService<MileStoneModel> {
  //private dataActions : InformationRequestModel[]=[]; 

  constructor(httpClient: HttpClient, private router: Router) {
    // Call the parent constructor with base URL and endpoint for user data
    super(httpClient, 'http://localhost:5212', 'inforequests');
  }

  getMileStones(): Observable<MileStoneModel[]> {
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
