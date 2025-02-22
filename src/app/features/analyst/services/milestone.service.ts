import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MileStoneModel } from '../../../shared/milestone-model';
import { BaseService } from '../../../shared/services/common-http-service';

@Injectable({
  providedIn: 'root'
})
export class MileStoneService extends BaseService<MileStoneModel> {
  
  constructor(httpClient: HttpClient, private router: Router) {
    super(httpClient, 'http://localhost:5212/api', 'Milestone'); // Use BaseService logic
  }

  getMileStoneList(page: number = 1, pageSize: number = 10): Observable<{ data: MileStoneModel[], totalCount: number }> {
    return this.get(page, pageSize).pipe(
      map(response => ({
        data: response, // The actual milestone records
        totalCount: 10//response.values.c // The total number of records
      }))
    );
  }
  /** 🔹 Update milestone */
  updateMileStone(updateMileStone: MileStoneModel): Observable<MileStoneModel> {
    return this.update(updateMileStone);
  }

  /** 🔹 Add new milestone */
  addMileStone(newMileStone: MileStoneModel): Observable<MileStoneModel> {
    return this.create(newMileStone);
  }

  deleteMileStone(item: MileStoneModel): Observable<any> {
    return this.delete(item).pipe(
      // Handle response, if necessary
    );
  }

 }

