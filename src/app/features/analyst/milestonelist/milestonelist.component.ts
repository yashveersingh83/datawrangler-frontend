import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { MileStoneService } from '../services/milestone.service';
import { MileStoneModel } from '../../../shared/milestone-model';
import { YearService } from '../../../shared/services/year-service';

@Component({
  selector: 'app-milestonelist',
  standalone:false,
  templateUrl: './milestonelist.component.html',
  styleUrls: ['./milestonelist.component.scss']
})
export class MilestonelistComponent implements OnInit {
  mileStoneDataSource: any;
  yearDataSource:any;
  selectedRowData: MileStoneModel | null = null;
  constructor(private milestoneService: MileStoneService,private yearService: YearService) {

  }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  /** 🔹 Initialize DevExtreme DataGrid with a CustomStore */
  initializeDataSource() {
    this.initializeMileStoneStore();
this.yearDataSource = new CustomStore({
  key:'year',
  load:()=>{
    return this.yearService.getYears();
  },
 

});

    
  }


  private initializeMileStoneStore() {
    this.mileStoneDataSource = new CustomStore({
      key: 'id', // Ensure `id` is the correct primary key

     
        
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

   /** 🔹 Row Editing Start - Store the full object before editing */
   onRowEditStart(e: any) {
    this.selectedRowData = { ...e.data }; // Store a copy of the full object when editing starts
  }
  onRowSaving(e: any) {
    const updatedData = e.data; // The updated data
    const key = updatedData.id; // Assuming `id` is the primary key

    // If we have the full object stored, we can merge it with the updated values
    if (this.selectedRowData) {
      const fullObject = { ...this.selectedRowData, ...updatedData }; // Merge the full object with updated fields

      // Replace the data with the full object
      e.data = fullObject;

      // You can now send the full object (including unchanged fields) to the API
      this.milestoneService.updateMileStone(fullObject).subscribe(() => {
        // After saving, reset the selectedRowData
        this.selectedRowData = null;
      });
    }
  }
}
