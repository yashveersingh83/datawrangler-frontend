import { Component } from '@angular/core';
import { CoordinatorModel } from '../../../shared/coordinator-model';
import { RecepientService } from '../services/recepients.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-coordinatorlist',
  standalone: false,
  
  templateUrl: './coordinatorlist.component.html',
  styleUrl: './coordinatorlist.component.scss'
})
export class CoordinatorlistComponent {
columns: any[];
  editing: any;
  coordinators$ :Observable<CoordinatorModel[]>= of([]);
  constructor(private inforService:RecepientService){
      // Define columns
      this.columns = [
        
        { dataField: 'Id', caption: 'ID', allowEditing: false ,visible: false},
        { dataField: 'Division', caption: 'Division', allowEditing: false },
        { dataField: 'CoordinatorName', caption: 'Name' },
        { dataField: 'Comments', caption: 'Comments', dataType: 'string' },       
        
        {
          dataField: 'CoordinatorRoles',
          caption: 'Roles',
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
      
      this.coordinators$ = this.inforService.fetchInformationRequest();
     
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
