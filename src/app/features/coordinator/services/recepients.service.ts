import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Router } from '@angular/router';
import { BaseService } from '../../../shared/services/common-http-service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CoordinatorModel } from '../../../shared/coordinator-model';
import { KeycloakAuthService } from '../../authentication/services/keycloak-auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecepientService extends BaseService<CoordinatorModel> {
  //private dataActions : InformationRequestModel[]=[]; 

  constructor(httpClient: HttpClient, private router: Router) {
    // Call the parent constructor with base URL and endpoint for user data
    super(httpClient, environment.apiUrl, 'Coordinator');
  }

  fetchInformationRequest(): Observable<CoordinatorModel[]> {
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
