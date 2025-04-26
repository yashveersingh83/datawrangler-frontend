import { Component, OnInit, signal } from '@angular/core';
import { ManagerService } from '../services/managers.service';
import { ManagerModel } from '../../../shared/manager-model';
import { OrganizationalUnitModel } from '../../../shared/organizationalUnit-model';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-manager',
  standalone: false, 
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent implements OnInit {
  
  columns:any[];editing:any;
  //managers = signal<ManagerModel[]>([]);
  orgUnits: OrganizationalUnitModel[] = [];
  managerCustomStore: any;  
  selectedManager: ManagerModel | null = null;
  isPopupVisible: boolean = false;
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

    
    this.editing = {
      mode: 'popup', 
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true
    };

  }

  private initializeManagerStore() {
    this.managerCustomStore = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
        const page = 1;//(loadOptions.skip / loadOptions.take) + 1 || 1; // Calculate the current page
        const pageSize = 10//loadOptions.take || 10; // Get the page size
        return this.managerService.getManagers().toPromise();
      },
      insert: (values) => {
        return this.managerService.create(values).toPromise();
      },
      update: (key, updatedValues) => {
        return this.managerService.getById(key).toPromise().then(existingData => {
          if (!existingData) {
            throw new Error('Existing data not found.');
          }
          const updatedObject = { ...existingData, ...updatedValues };
          return this.managerService.update(updatedObject).toPromise();
        }).catch(error => {
          console.error('Error updating manager:', error);
          throw error;
        });
      },
      remove: (key:any) => {
        return this.managerService.deleteManager(key).toPromise();
      },
    });
  }
  ngOnInit(): void {

   this.initializeManagerStore();

  }
  openPopup(manager: ManagerModel | null): void {
    this.selectedManager = manager ? { ...manager } : this.createEmptyManager(); // Re; // Pass a copy of the manager or null for new
    this.isPopupVisible = true;
  }
  // openPopup(e: any) {
   
  //   if (e.id) {
  //     this.managerService.getById(e.id).subscribe(request => {
  //       this.selectedManager = e;
  //       this.isPopupVisible = true;
  //     });
  //   } else {
  //     this.selectedManager = null;
  //     this.isPopupVisible = true;
  //   }
  // }

  deleteRequest(key: any) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.managerService.delete(key).subscribe(() => {
        alert('Request deleted successfully');
        
      });
    }
  }
  onSave(requestData: ManagerModel) {
    if (requestData.id !='0' ) {
      this.managerService.update(requestData).subscribe(() => {
        //this.showForm = false;
        this.isPopupVisible = false;
        this.initializeManagerStore(); // Refresh the data grid
      });
    } else {
      this.managerService.create(requestData).subscribe(() => {
        //this.showForm = false;
        this.isPopupVisible = false;
        this.initializeManagerStore(); // Refresh the data grid
      });
    }
  }
  onCancel() {
    this.isPopupVisible = false;
  }
  private createEmptyManager(): ManagerModel {
    return {
      id: '',
      ddsuCode: '',
      division: '',
      sectionCode: '',
      fullName: '',
      functionalTitle: '',
      personnelNumber: '',
      contributorRole: false,
      approverRole: false,
      divisionCode: '',
      coordinatorRoles: '',
     
      managerComment: '',
      showWarningIcon: false,
      warningTitle: '',
      approverRoleForExcel: '',
      
    };
  }
}
