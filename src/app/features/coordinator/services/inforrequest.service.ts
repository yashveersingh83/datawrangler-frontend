import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Router } from '@angular/router';
import { BaseService } from '../../../shared/services/common-http-service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { KeycloakAuthService } from '../../authentication/services/keycloak-auth.service';

@Injectable({
  providedIn: 'root'
})
export class InforrequestService extends BaseService<InformationRequestModel> {
  //private dataActions : InformationRequestModel[]=[]; 

  constructor(httpClient: HttpClient, private router: Router) {
    // Call the parent constructor with base URL and endpoint for user data
    super(httpClient, 'http://localhost:5212/api', 'InformationRequest');
  }

  
    getList(page: number = 1, pageSize: number = 10): Observable<{ data: InformationRequestModel[], totalCount: number }> {
      return this.get(page, pageSize).pipe(
        map(response => ({
          data: response, // The actual milestone records
          totalCount: 10//response.values.c // The total number of records
        }))
      );
    }
    /** 🔹 Update milestone */
    updateRequestRequest(updateMileStone: InformationRequestModel): Observable<InformationRequestModel> {
      return this.update(updateMileStone);
    }
  
    /** 🔹 Add new milestone */
    addRequest(newMileStone: InformationRequestModel): Observable<InformationRequestModel> {
      return this.create(newMileStone);
    }
  
    deleteRequest(item: InformationRequestModel): Observable<any> {
      return this.delete(item).pipe(
        // Handle response, if necessary
      );
    }
}
