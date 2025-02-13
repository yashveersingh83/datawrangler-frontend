import { Component } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { SubmissionService } from '../services/submission-service';
import { Observable, of } from 'rxjs';
import { SubmissionModel } from '../../../shared/submission-model';

@Component({
  selector: 'app-submissionlist',
  standalone: false,
  
  templateUrl: './submissionlist.component.html',
  styleUrl: './submissionlist.component.scss'
})
export class SubmissionlistComponent {
columns: any[];
  editing: any;
  submissions$ :Observable<SubmissionModel[]>= of([]);
  constructor(private inforService:SubmissionService){
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
      
      this.submissions$ = this.inforService.fetchInformationRequest();
     
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
