import { Component } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Observable, of } from 'rxjs';
import { InforrequestService } from '../services/inforrequest.service';

@Component({
  selector: 'app-informationrequest',
  standalone: false,
  
  templateUrl: './informationrequest.component.html',
  styleUrl: './informationrequest.component.scss'
})
export class InformationrequestComponent {
  columns: any[];
  editing: any;
  dataActions$ :Observable<InformationRequestModel[]>= of([]);
  constructor(private inforService:InforrequestService){
      // Define columns
      this.columns = [
        { dataField: 'Id', caption: 'ID', allowEditing: false },
        { dataField: 'SIRYear', caption: 'Year', allowEditing: false },
        { dataField: 'RequestNumber', caption: 'RequestNumber' },
        { dataField: 'CoordinatorName', caption: 'CoordinatorName', dataType: 'string' },  
        { dataField: 'SubmissionType', caption: 'SubmissionType', dataType: 'string' },          
        
        {
          dataField: 'InformationSought',
          caption: 'InformationSought',
          dataType: 'string'
        }
      ];
  
      // Editing configuration
      this.editing = {
        mode: 'popup', // Options: 'popup', 'batch', 'cell', 'row'
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true
      };
    }
    ngOnInit() {
      
      this.dataActions$ = this.inforService.fetchInformationRequest();
     
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
