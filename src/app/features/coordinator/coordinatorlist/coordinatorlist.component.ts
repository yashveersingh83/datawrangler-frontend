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
        
        { dataField: 'id', caption: 'ID', allowEditing: false ,visible: false},
        { dataField: 'division', caption: 'Division', allowEditing: false },
        { dataField: 'coordinatorName', caption: 'Name' },
        { dataField: 'organizationalUnitName', caption: 'Organizational Unit', dataType: 'string' },       
        { dataField: 'comments', caption: 'Comments', dataType: 'string' },   
        { dataField: 'isActive', caption: 'Active', dataType: 'bool' },       
        
      
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
