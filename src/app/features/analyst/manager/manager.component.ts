import { Component, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../services/managers.service';
import { sharedModule } from '../../../shared/common-module';
import { ManagerModel } from '../../../shared/manager-model';

@Component({
  selector: 'app-manager',
  standalone: false, // Enable standalone component if needed
  //imports: [sharedModule,], // Explicitly import required modules
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent implements OnInit {
  
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
      { dataField: 'contributorRole', caption: 'IsCoordinator', dataType: 'bool' },
      { dataField: 'approverRole', caption: 'IsApprover', dataType: 'bool' },
      
     
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
    this.managerService.getManagerList().subscribe({
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
