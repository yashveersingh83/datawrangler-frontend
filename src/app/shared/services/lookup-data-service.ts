import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestStatusModel, SubmissionTypeModel } from '../milestone-model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LookupDataService  {
  private readonly baseUrl =  environment.apiUrl+'/Lookup';

  constructor(private httpClient: HttpClient) {
    
    
    
  }
  getRequestStatus(): Observable<RequestStatusModel[]> {
    return this.httpClient.get<RequestStatusModel[]>(`${this.baseUrl}/request-status`);
  }

  getSubmissionType(): Observable<SubmissionTypeModel[]> {
    return this.httpClient.get<SubmissionTypeModel[]>(`${this.baseUrl}/submission-type`);
  }
}