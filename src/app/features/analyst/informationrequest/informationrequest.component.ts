import { Component } from '@angular/core';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { Observable, of } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import { MileStoneService } from '../../analyst/services/milestone.service';
import { YearService } from '../../../shared/services/year-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InforrequestService } from '../services/inforrequest.service';
import { ManagerService } from '../services/managers.service';
import { ManagerModel, Years } from '../../../shared/manager-model';
import { MileStoneModel, RequestStatusModel, SubmissionTypeModel } from '../../../shared/milestone-model';
import { OrganizationalUnitModel } from '../../../shared/organizationalUnit-model';
import { LookupDataService } from '../../../shared/services/lookup-data-service';

@Component({
  selector: 'app-informationrequest',
  templateUrl: './informationrequest.component.html',
  standalone: false,
  styleUrls: ['./informationrequest.component.scss']
})
export class InformationrequestComponent {
  informationRequestDataSource: any;  
  selectedRequest: InformationRequestModel | null = null;
  isPopupVisible: boolean = false;
  editMode: boolean = false;
  selectedRequestId: string | null = null;
 
  coordinators: ManagerModel[] = []
  approvers: ManagerModel[] = [];
  milestones: MileStoneModel[] = [];
  years: Years[] = [];
  showForm: boolean = false;
  orgUnits: OrganizationalUnitModel[] = [];
  requestStatuses: RequestStatusModel[] = [];
  submissionTypes: SubmissionTypeModel[] = [];
  constructor(
    private fb: FormBuilder,
    private inforService: InforrequestService,
    private yearService: YearService,
    private mileStoneService: MileStoneService,
    private approverSerive: ManagerService ,
    private lookupDataService: LookupDataService
  ) {
    this.initializeDataSource();
    approverSerive.getManagerList().subscribe(
      managers => {
        this.approvers = managers;

      });

    approverSerive.getContributors().subscribe(
      coordinators => {
        this.coordinators = coordinators;
      });

    approverSerive.getOrgUnits().subscribe(
      units => {
        this.orgUnits = units;
      });


    this.mileStoneService.getMileStoneList()
      .subscribe(mileStones => {
        this.milestones = mileStones.data;
      })

      this.lookupDataService.getRequestStatus().subscribe(
        status => {  this.requestStatuses = status; });

      this.lookupDataService.getSubmissionType().subscribe(
        type => { this.submissionTypes = type; });

  
  }

  initializeDataSource() {
    this.initializeRequestStore();
  }

  private initializeRequestStore() {
    this.informationRequestDataSource = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
        const page = 1// (loadOptions.skip / loadOptions.take) + 1 || 1;
        const pageSize = 10;
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
    this.selectedRequest = this.createEmptyRequest();
    if (id) {
      this.inforService.getById(id).subscribe(request => {
        this.selectedRequest = request;
        this.isPopupVisible = true;
      });
    } else {
      this.selectedRequest = this.createEmptyRequest();
      this.isPopupVisible = true;
    }
  }

  deleteRequest(key: any) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.inforService.deleteRequest(key).subscribe(() => {
        alert('Request deleted successfully');
        this.initializeDataSource();
      });
    }
  }

  onSave(requestData: InformationRequestModel) {
    if (requestData.id !='0') {
      this.inforService.updateRequestRequest(requestData).subscribe(() => {
        this.showForm = false;
        this.isPopupVisible = false;
        this.initializeDataSource(); // Refresh the data grid
      });
    } else {
      this.inforService.addRequest(requestData).subscribe(() => {
        this.showForm = false;
        this.isPopupVisible = false;
        this.initializeDataSource(); // Refresh the data grid
      });
    }
  }

  onCancel() {
    this.isPopupVisible = false;
    this.selectedRequest = null;
    this.showForm = false;
  }
  private createEmptyRequest(): InformationRequestModel {
    return {
      id: '',
      requestNumber: '',
      sirYear: 0,
      mileStoneDate: "",
      submissionType: '',
      organizationalUnitName: '',
      coordinatorName: '',
      worksheetType: '',
      approverName: '',
      requestStatus: '',
      approverID: '',
      recipientID: '',
      milestoneID: '',
      approver: '',
      informationRequest: '',
      requestStatusType: 0,
      informationSought: '',
      spqComment: '',
      worksheetAvailabilityDate: null,
      worksheetDetails: '',
      worksheetTabs: '',
      existingSubmissionType: '',
      inputWorksheetLink: '',
      latestSubmittedWorksheetLink: '',
      ddsuCode: '',
      requestStatusID: '',
      organizationalUnitID: '',
      submissionTypeID: '',
    };
  }
}