import { Component } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Observable, of } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import { MileStoneService } from '../../analyst/services/milestone.service';
import { YearService } from '../../../shared/services/year-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InforrequestService } from '../services/inforrequest.service';
import { ManagerService } from '../services/managers.service';
import { ManagerModel } from '../../../shared/manager-model';
import { MileStoneModel } from '../../../shared/milestone-model';

@Component({
  selector: 'app-informationrequest',
  templateUrl: './informationrequest.component.html',
  standalone:false,
  styleUrls: ['./informationrequest.component.scss']
})
export class InformationrequestComponent {
  informationRequestDataSource: any;
  requestForm: FormGroup;
  selectedRequest: InformationRequestModel | null = null;
  isPopupVisible: boolean = false;
  editMode: boolean = false;
  selectedRequestId: string | null = null;
  submissionTypes: string[] = ['Type A', 'Type B', 'Type C']; // Example data
  coordinators: ManagerModel[]=[]
  approvers: ManagerModel[]=[] ;
  milestones: MileStoneModel[] = [];
  showForm: boolean = false;
  yearDataSource = new CustomStore({
    key: 'year',
    loadMode: 'raw',
    load: () => {
      return this.yearService.getYears();
    }
  });

  mileStoneDataSource = new CustomStore({
    key: 'id',
    load: () => {
      return this.mileStoneService.getMileStoneList();
    }
  });

  constructor(
    private fb: FormBuilder,
    private inforService: InforrequestService,
    private yearService: YearService,
    private mileStoneService: MileStoneService ,
    private approverSerive:ManagerService
  ) {
    this.initializeDataSource();
    approverSerive.getManagerList().subscribe( 
      managers =>{
        this.approvers = managers;
        // managers can be coordinators as well 
        this.coordinators =managers;
      
      });
      this.mileStoneService.getMileStoneList()
      .subscribe(mileStones =>  {
        this.milestones = mileStones.data; })
    this.requestForm = this.fb.group({
      id: [null],
      requestNumber: ['', Validators.required],
      sirYear: ['', Validators.required],
      mileStoneDate: ['', Validators.required],
      submissionType: ['', Validators.required],
      organizationalUnitName: ['', Validators.required],
      coordinatorName: ['', Validators.required],
      worksheetType: [''],
      approverName: [''],
      worksheetDetails: [''],
      inputWorksheetLink: [''],
      informationSought: [''],
      spqComment: [''],
      requestStatus: ['', Validators.required]
    });
  }

  initializeDataSource() {
    this.initializeRequestStore();
  }

  private initializeRequestStore() {
    this.informationRequestDataSource = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
        const page = 1// (loadOptions.skip / loadOptions.take) + 1 || 1;
        const pageSize =  10;
        return this.inforService.getList(page, pageSize).toPromise();
      },
      insert: (values) => {
        return this.inforService.addRequest(values).toPromise();
      },
      update: (key, updatedValues) => {
        return this.inforService.getById(key).toPromise().then(existingData => {
          if (!existingData) {
            throw new Error("Existing data not found.");
          }
          const updatedObject = { ...existingData, ...updatedValues };
          return this.inforService.updateRequestRequest(updatedObject).toPromise();
        }).catch(error => {
          console.error("Error updating request:", error);
          throw error;
        });
      },
      remove: (key) => {
        return this.inforService.deleteRequest(key).toPromise();
      }
    });
  }

  openPopup(id?: any) {
    if (id) {
      this.inforService.getById(id).subscribe(request => {
        this.selectedRequest = request;
        this.isPopupVisible = true;
      });
    } else {
      this.selectedRequest = null;
      this.isPopupVisible = true;
    }
  }

  deleteRequest(id: number) {
    if (confirm('Are you sure you want to delete this request?')) {
      // this.inforService.deleteRequest(id).subscribe(() => {
      //   alert('Request deleted successfully');
      //   this.initializeDataSource();
      // });
    }
  }

  onSave(requestData: InformationRequestModel) {
    if (requestData.id) {
      this.inforService.updateRequestRequest(requestData).subscribe(() => {
        this.showForm = false;
        this.initializeDataSource(); // Refresh the data grid
      });
    } else {
      this.inforService.addRequest(requestData).subscribe(() => {
        this.showForm = false;
        this.initializeDataSource(); // Refresh the data grid
      });
    }
  }

  onCancel() {
    this.showForm = false;
  }
}