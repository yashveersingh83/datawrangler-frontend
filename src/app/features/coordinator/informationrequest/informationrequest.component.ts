import { Component } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Observable, of } from 'rxjs';
import { InforrequestService } from '../services/inforrequest.service';
import CustomStore from 'devextreme/data/custom_store';
import { MileStoneService } from '../../analyst/services/milestone.service';
import { YearService } from '../../../shared/services/year-service';

@Component({
  selector: 'app-informationrequest',
  standalone: false,
  
  templateUrl: './informationrequest.component.html',
  styleUrl: './informationrequest.component.scss'
})
export class InformationrequestComponent {
  
  informationRequestDataSource :any;
  dataActions$ :Observable<InformationRequestModel[]>= of([]);

   yearDataSource = new CustomStore({
       key: 'year',
       loadMode:'raw',
       load: () => {
         return this.yearService.getYears();
       },
       
         });
    mileStoneDataSource = new CustomStore({
      key: 'id',
      
      load: () => {
        return this.mileStoneService.getMileStoneList();
      },
      
     
        });
  constructor(private inforService:InforrequestService , private yearService:YearService,
    private  mileStoneService : MileStoneService){

    this.initializeDataSource();
      // Define columns
     
  
      
    }
    ngOnInit() {
      
      
     
    }
  
    /** 🔹 Initialize DevExtreme DataGrid with a CustomStore */
  initializeDataSource() {
    this.initializeRequestStore();
  }
  private initializeRequestStore() {
      this.informationRequestDataSource = new CustomStore({
        key: 'id', // Ensure id is the correct primary key
  
        // 🔹 Fetch milestone list with pagination
        load: (loadOptions) => {
          let page = 1; //(loadOptions.skip / loadOptions.take) + 1 || 1;
          let pageSize = loadOptions.take || 10;
  
          return this.inforService.getList(page, pageSize).toPromise();
        },
  
        // 🔹 Insert new milestone
        insert: (values) => {
          return this.inforService.addRequest(values).toPromise();
        },
  
        update: (key, updatedValues) => {
          return this.inforService.getById(key).toPromise().then(existingData => {
            if (!existingData) {
              throw new Error("Existing data not found.");
            }
        
            const updatedObject = { ...existingData, ...updatedValues };
        
            // const patchObject = (existingData:any, updatedValues:any) => {
            //   for (let key in updatedValues) {
            //     if (updatedValues[key] !== undefined) {
            //       existingData[key] = updatedValues[key];
            //     }
            //   }
            //   return existingData;
            // };
            
            // const patchedObject = patchObject(existingData, updatedValues);
        
            // Debugging logs
            console.log("Existing Data:", existingData);
            console.log("New Values:", updatedValues);
            console.log("Updated Object Before Sending:", updatedObject);
        
            return this.inforService.updateRequestRequest(updatedObject).toPromise();
          }).catch(error => {
            console.error("Error updating request:", error);
            throw error;
          });
        }
        
  
        // remove: (key) => {
        //   return this.inforService.deleteMileStone({ id: key, Comments: '', Description: '', SIRYear: 0, Targetdate: new Date() }).toPromise();
        // }
      });
    }
  

    onPagingChange(e: any) {
      if (e.fullName === 'paging.pageSize' || e.fullName === 'paging.pageIndex') {
        const pageSize = e.component.pageSize();
        const pageIndex = e.component.pageIndex();
  
        console.log(`Page size: ${pageSize}, Page index: ${pageIndex}`);
        // API calls are already handled in the custom data source, no need to call here
      }
    }
}
