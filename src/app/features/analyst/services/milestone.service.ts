import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MileStoneModel } from '../../../shared/milestone-model';
import { BaseService } from '../../../shared/common-http-service';

@Injectable({
  providedIn: 'root'
})
export class MileStoneService extends BaseService<MileStoneModel> {
  
  constructor(httpClient: HttpClient, private router: Router) {
    super(httpClient, 'http://localhost:5212/api', 'Milestone'); // Use BaseService logic
  }

  /** 🔹 Fetch milestones */
  getMileStoneList(page: number = 1, pageSize: number = 10): Observable<MileStoneModel[]> {
    return this.get(page, pageSize);
  }

  /** 🔹 Update milestone */
  updateMileStone(updateMileStone: MileStoneModel): Observable<MileStoneModel> {
    return this.update(updateMileStone);
  }

  /** 🔹 Add new milestone */
  addMileStone(newMileStone: MileStoneModel): Observable<MileStoneModel> {
    return this.create(newMileStone);
  }

  /** 🔹 Delete milestone */
  //deleteMileStone(id: number): Observable<void> {
   // return this.delete({ Id: id } as MileStoneModel);
 // }
}
