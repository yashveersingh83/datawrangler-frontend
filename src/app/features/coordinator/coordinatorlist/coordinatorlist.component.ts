import { Component, signal } from '@angular/core';
import { CoordinatorModel } from '../../../shared/coordinator-model';
import { RecepientService } from '../services/recepients.service';
import { Observable, of } from 'rxjs';
import { ManagerModel } from '../../../shared/manager-model';
import { ManagerService } from '../../analyst/services/managers.service';

@Component({
  selector: 'app-coordinatorlist',
  standalone: false,
  
  templateUrl: './coordinatorlist.component.html',
  styleUrl: './coordinatorlist.component.scss'
})
export class CoordinatorlistComponent {

  columns:any[];editing:any;
  managers = signal<ManagerModel[]>([]);



  constructor(private managerService: ManagerService) {

    this.columns = [
      { dataField: 'id', caption: 'ID', allowEditing: false ,visible: false},
      { dataField: 'ddsuCode', caption: 'DDSUCode', allowEditing: false },      
      { dataField: 'division', caption: 'Division', allowEditing: false },
      { dataField: 'sectionCode', caption: 'Section Code' },      
      { dataField: 'fullName', caption: 'Name', dataType: 'string' },  
      { dataField: 'functionalTitle', caption: 'FunctionalTitle', dataType: 'string' },  
      { dataField: 'personnelNumber', caption: 'Personnel Number', dataType: 'string' },  
      
     
    ];

    // Editing configuration
    this.editing = {
      mode: 'popup', // Options: 'popup', 'batch', 'cell', 'row'
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true
    };
  }

  ngOnInit(): void {
    this.managerService.getContributors().subscribe({
      next: (data) => this.managers.set(data), // ✅ Updating signal state
      error: (error) => console.error('Error fetching managers:', error)
    });
  }

  onPagingChange(event: { fullName: string; component: { pageSize: () => number; pageIndex: () => number } }): void {
    if (event.fullName === 'paging.pageSize' || event.fullName === 'paging.pageIndex') {
      console.log(`Page size: ${event.component.pageSize()}, Page index: ${event.component.pageIndex()}`);
    }
  }
}
