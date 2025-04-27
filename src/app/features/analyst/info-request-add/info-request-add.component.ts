import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InformationRequestModel } from '../../../shared/info-request-model';
import { ManagerModel, Years } from '../../../shared/manager-model';
import { MileStoneModel, RequestStatusModel, SubmissionTypeModel } from '../../../shared/milestone-model';
import { OrganizationalUnitModel } from '../../../shared/organizationalUnit-model';

import { createEmptyNavigationContext, NavigationContext } from '../../../navbar/NavigationContext';
import { FeaturePermissions } from '../../feature-permission.config';

import { InforrequestService } from '../services/inforrequest.service';
import { ManagerService } from '../services/managers.service';
import { MileStoneService } from '../services/milestone.service';
import { LookupDataService } from '../../../shared/services/lookup-data-service';
import { YearService } from '../../../shared/services/year-service';
import { FeaturePermissionService } from '../../feature-permission.service';
import { KeycloakAuthService } from '../../authentication/services/keycloak-auth.service';

@Component({
  selector: 'app-info-request-add',
  standalone: false,
  templateUrl: './info-request-add.component.html',
  styleUrls: ['./info-request-add.component.scss']
})
export class InfoRequestAddComponent implements OnInit {

  @Output() save = new EventEmitter<InformationRequestModel>();
  @Output() cancel = new EventEmitter<void>();

  requestForm: FormGroup;
  isSubmitting = false;
  permissions: FeaturePermissions | any;
  navigationContext: NavigationContext = createEmptyNavigationContext();
  
  key: string  = 'new';
  years: Years[] = [];
  coordinators: ManagerModel[] = [];
  approvers: ManagerModel[] = [];
  milestones: MileStoneModel[] = [];
  orgUnits: OrganizationalUnitModel[] = [];
  requestStatuses: RequestStatusModel[] = [];
  submissionTypes: SubmissionTypeModel[] = [];
  requestData: InformationRequestModel | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inforService: InforrequestService,
    private yearService: YearService,
    private featurePermissionService: FeaturePermissionService,
    private keycloakAuthService: KeycloakAuthService,
    private managerService: ManagerService,
    private lookupDataService: LookupDataService,
    private mileStoneService: MileStoneService
  ) {
    this.requestForm = this.createForm();
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('id') || 'new';
  
    const roles = this.keycloakAuthService.getUserRoles();
    const profile = this.keycloakAuthService.getUserProfile();
    this.navigationContext = { userRoles: roles, userProfile: profile };
    this.permissions = this.featurePermissionService.getInformationRequestPermissions(this.navigationContext);
  
    this.years = this.yearService.getYears();
  
    this.loadSupportingData(() => {
      if (this.key !== 'new') {
        this.inforService.getByStringId(this.key).subscribe(request => {
          this.requestData = request;
          this.requestForm.patchValue(request);
          this.applyPermissions();
          this.updateForm();
          this.requestForm.markAsPristine(); // Reset dirty state
        });
      }
      this.setupFormListeners(); // Setup listeners after data is loaded
    });
  }
  
  private loadSupportingData(onLoaded: () => void): void {
    let loadedCount = 0;
  
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 5) {
        onLoaded(); // all data loaded, call the callback
      }
    };
  
    this.managerService.getManagerList().subscribe(managers => {
      this.approvers = managers;
      checkAllLoaded();
    });
    this.managerService.getContributors().subscribe(coordinators => {
      this.coordinators = coordinators;
      checkAllLoaded();
    });
    this.managerService.getOrgUnits().subscribe(units => {
      this.orgUnits = units;
      checkAllLoaded();
    });
    this.mileStoneService.getMileStoneList().subscribe(response => {
      this.milestones = response.data;
      checkAllLoaded();
    });
    this.lookupDataService.getRequestStatus().subscribe(status => {
      this.requestStatuses = status;
      checkAllLoaded();
    });
    this.lookupDataService.getSubmissionType().subscribe(
      type => { this.submissionTypes = type; });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestData'] && changes['requestData'].currentValue) {
      const roles =  this.keycloakAuthService.getUserRoles();
      const profile = this.keycloakAuthService.getUserProfile();
  
      this.navigationContext = { userRoles: roles, userProfile: profile };
      this.permissions = this.featurePermissionService.getInformationRequestPermissions(this.navigationContext);
      this.updateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      requestNumber: ['', Validators.required],
      sirYear: ['', Validators.required],
      mileStoneDate: [''],
      submissionType: ['', Validators.required],
      organizationalUnitName: ['', ],
      coordinatorName: [''],
      worksheetType: [''],
      approverName: [''],
      worksheetTabs: [''],
      worksheetDetails: [''],
      informationSought: [''],
      spqComment: [''],
      worksheetAvailabilityDate: [''],
      requestStatusID: ['', Validators.required],
      selectedApproverId: ['', Validators.required],
      inputWorksheetLink: [''],
      ddsuCode: [''],
      latestSubmittedWorksheetLink: [''],
      selectedCoordinatorId: ['', Validators.required],
      selectedMilestoneId: ['', Validators.required],
      organizationalUnitID: ['', Validators.required],
      submissionTypeID: ['', Validators.required],
    });
  }

  private setupFormListeners(): void {
    // Milestone selection listener
    this.requestForm.get('selectedMilestoneId')?.valueChanges.subscribe((milestoneId) => {
      const selectedMilestone = this.milestones.find(m => m.id === milestoneId);
      if (selectedMilestone) {
        this.requestForm.patchValue({
          mileStoneDate: selectedMilestone.targetdate,
        }, { emitEvent: false });
      }
    });

    // Coordinator selection listener
    this.requestForm.get('selectedCoordinatorId')?.valueChanges.subscribe((coordinatorId) => {
      const selectedCoordinator = this.coordinators.find(c => c.id === coordinatorId);
      if (selectedCoordinator) {
        this.requestForm.patchValue({
          coordinatorName: selectedCoordinator.fullName,
        }, { emitEvent: false });
      }
    });

    // Approver selection listener
    this.requestForm.get('selectedApproverId')?.valueChanges.subscribe((approverId) => {
      const selectedApprover = this.approvers.find(a => a.id === approverId);
      if (selectedApprover) {
        this.requestForm.patchValue({
          approverName: selectedApprover.fullName,
        }, { emitEvent: false });
      }
    });

    // Request Status selection listener
    this.requestForm.get('requestStatusID')?.valueChanges.subscribe((statusId) => {
      const selectedStatus = this.requestStatuses.find(s => s.id === statusId);
      if (selectedStatus) {
        this.requestForm.patchValue({
          requestStatus: selectedStatus.status,
        }, { emitEvent: false });
      }
    });

    // Organizational Unit selection listener
    this.requestForm.get('organizationalUnitID')?.valueChanges.subscribe((orgUnitId) => {
      const selectedOrgUnit = this.orgUnits.find(o => o.id === orgUnitId);
      if (selectedOrgUnit) {
        this.requestForm.patchValue({
          organizationalUnitName: selectedOrgUnit.division,
        }, { emitEvent: false });
      }
    });

    // Submission Type selection listener
    this.requestForm.get('submissionTypeID')?.valueChanges.subscribe((submissionTypeID) => {
      const selectedSubmissionType = this.submissionTypes.find(s => s.id === submissionTypeID);
      if (selectedSubmissionType) {
        this.requestForm.patchValue({
          submissionType: selectedSubmissionType.type,
        }, { emitEvent: false });
      }
    });
  }

  private updateForm(): void {
    if (!this.requestData) return;

    const selectedApprover = this.approvers.find(a => a.id === this.requestData?.approverID);
    const selectedCoordinator = this.coordinators.find(c => c.id === this.requestData?.recipientID);
    const selectedMilestone = this.milestones.find(m => m.id === this.requestData?.milestoneID);
    const selectedOrgUnit = this.orgUnits.find(o => o.id === this.requestData?.organizationalUnitID);
    const selectedRequest = this.requestStatuses.find(o => o.id === this.requestData?.requestStatusID);
    const selectedSubmissionType = this.submissionTypes.find(o => o.id === this.requestData?.submissionTypeID);

    this.requestForm.patchValue({
      ...this.requestData,
      selectedApproverId: selectedApprover?.id || null,
      selectedCoordinatorId: selectedCoordinator?.id || null,
      selectedMilestoneId: selectedMilestone?.id || null,
      mileStoneDate: selectedMilestone?.targetdate || this.requestData.mileStoneDate || null,
      approverName: selectedApprover?.fullName || this.requestData.approverName || null,
      coordinatorName: selectedCoordinator?.fullName || this.requestData.coordinatorName || null,
      organizationalUnitName: selectedOrgUnit?.division || this.requestData.organizationalUnitName || null,
      requestStatusID: selectedRequest?.id || null,
      submissionType: selectedSubmissionType?.type || null,
      submissionTypeID: selectedSubmissionType?.id || null,
    }, { emitEvent: false });
    this.applyPermissions();
  }

  onSubmit(): void {
    const dirtyFields = this.getDirtyValues(this.requestForm);
    if (this.requestForm.invalid) return;
  
    this.isSubmitting = true;
    const model = this.convertFormToModel();
  
    console.log('Form submitted:', model);
  
    if (model.id) {
      // If id exists => Update the existing record
      this.inforService.update(model).subscribe(
        () => {
          this.router.navigate(['/analyst/informationrequest']);
        },
        error => {
          console.error('Error updating request:', error);
        },
        () => {
          this.isSubmitting = false;
        }
      );
    } else {
      // If no id => Add a new record
      this.inforService.addRequest(model).subscribe(
        () => {
          this.router.navigate(['/analyst/informationrequest']);
        },
        error => {
          console.error('Error creating request:', error);
        },
        () => {
          this.isSubmitting = false;
        }
      );
    }
  }
  
  getDirtyValues(form: FormGroup | FormArray): any {
    const dirtyValues: any = {};
  
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
  
      if (control instanceof FormGroup || control instanceof FormArray) {
        const nestedDirty = this.getDirtyValues(control);
        if (Object.keys(nestedDirty).length > 0) {
          dirtyValues[key] = nestedDirty;
        }
      } else if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
  }
  
  private convertFormToModel(): InformationRequestModel {
    const formValue = this.requestForm.value;

    return {
      id: formValue.id,
      requestNumber: formValue.requestNumber,
      sirYear: formValue.sirYear,
      mileStoneDate: formValue.mileStoneDate,
      submissionType: formValue.submissionType,
      organizationalUnitName: this.orgUnits.find(o => o.id === formValue.organizationalUnitID)?.division || '',
      coordinatorName: this.coordinators.find(c => c.id === formValue.selectedCoordinatorId)?.fullName || '',
      worksheetType: formValue.worksheetType,
      approverName: this.approvers.find(a => a.id === formValue.selectedApproverId)?.fullName || '',
      requestStatus: this.requestStatuses.find(r => r.id === formValue.requestStatusID)?.status || '',
      approverID: formValue.selectedApproverId,
      recipientID: formValue.selectedCoordinatorId,
      milestoneID: formValue.selectedMilestoneId,
      approver: formValue.selectedApproverId,
      informationRequest: formValue.requestNumber,
      requestStatusType: formValue.requestStatus,
      informationSought: formValue.informationSought,
      spqComment: formValue.spqComment,
      worksheetAvailabilityDate: null,
      worksheetDetails: formValue.worksheetDetails,
      worksheetTabs: formValue.worksheetTabs,
      existingSubmissionType: formValue.submissionType,
      inputWorksheetLink: formValue.inputWorksheetLink,
      latestSubmittedWorksheetLink: formValue.latestSubmittedWorksheetLink,
      ddsuCode: formValue.ddsuCode,
      requestStatusID: formValue.requestStatusID,
      organizationalUnitID: formValue.organizationalUnitID,
      submissionTypeID: formValue.submissionTypeID,
    };
  }

  onCancel(): void {
    this.router.navigate(['/analyst/informationrequest']);
  }

  applyPermissions(): void {
    this.featurePermissionService.applyFieldPermissions(
      this.requestForm,
      this.permissions.editableFields,
      this.navigationContext
    );
  }
}
