import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { MileStoneService } from '../services/milestone.service';
import { MileStoneModel } from '../../../shared/milestone-model';
import { YearService } from '../../../shared/services/year-service';

@Component({
  selector: 'app-milestonelist',
  standalone: false,
  templateUrl: './milestonelist.component.html',
  styleUrls: ['./milestonelist.component.scss']
})
export class MilestonelistComponent implements OnInit {
  mileStoneDataSource: any;
  
  selectedRowData: MileStoneModel | null = null;
  yearDataSource = new CustomStore({
    key: 'year',
    loadMode:'raw',
    load: () => {
      return this.yearService.getYears();
    },
    
      });

  constructor(private milestoneService: MileStoneService,
     private yearService: YearService) 
     {
    this.initializeDataSource();
  }

  ngOnInit(): void {

  }

  /** 🔹 Initialize DevExtreme DataGrid with a CustomStore */
  initializeDataSource() {
    this.initializeMileStoneStore();
  }


  private initializeMileStoneStore() {
    this.mileStoneDataSource = new CustomStore({
      key: 'id', // Ensure id is the correct primary key

      // 🔹 Fetch milestone list with pagination
      load: (loadOptions) => {
        let page = 1; //(loadOptions.skip / loadOptions.take) + 1 || 1;
        let pageSize = loadOptions.take || 10;

        return this.milestoneService.getMileStoneList(page, pageSize).toPromise();
      },

      // 🔹 Insert new milestone
      insert: (values) => {
        return this.milestoneService.addMileStone(values).toPromise();
      },

      update: (key, values) => {
        // Fetch the existing milestone data from the API first
        return this.milestoneService.getById(key).toPromise().then(existingData => {
          // Merge the updated values with the existing data
          const updatedObject = { ...existingData, ...values };
          return this.milestoneService.updateMileStone(updatedObject).toPromise();
        });
      },

      remove: (key) => {
        return this.milestoneService.deleteMileStone({ id: key, Comments: '', Description: '', SIRYear: 0, Targetdate: new Date() }).toPromise();
      }
    });
  }

  
}