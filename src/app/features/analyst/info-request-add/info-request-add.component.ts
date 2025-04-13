import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { ManagerModel, Years } from '../../../shared/manager-model';
import { MileStoneModel, RequestStatusModel, SubmissionTypeModel } from '../../../shared/milestone-model';
import { InforrequestService } from '../services/inforrequest.service';
import { YearService } from '../../../shared/services/year-service';
import { OrganizationalUnitModel } from '../../../shared/organizationalUnit-model';

@Component({
  selector: 'app-info-request-add',
  standalone:false,
  templateUrl: './info-request-add.component.html',
  styleUrls: ['./info-request-add.component.scss']
})
export class InfoRequestAddComponent implements OnInit, OnChanges {
  // Input properties
  @Input() requestData: InformationRequestModel | null = null;  
  @Input() coordinators: ManagerModel[] = [];
  @Input() approvers: ManagerModel[] = [];
  @Input() milestones: MileStoneModel[] = [];
  @Input() orgUnits: OrganizationalUnitModel[] = [];
  @Input() requestStatuses: RequestStatusModel[] = [];
  @Input() submissionTypes: SubmissionTypeModel[] = [];
  
  // Output events
  @Output() save = new EventEmitter<InformationRequestModel>();
  @Output() cancel = new EventEmitter<void>();

  // Component state
  years: Years[] = [];
  requestForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private inforService: InforrequestService,
    private yearService: YearService
  ) {
    this.requestForm = this.createForm();
  }

  ngOnInit(): void {
    this.years = this.yearService.getYears();
    this.setupFormListeners();
    if (this.requestData) {
      this.updateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestData'] && changes['requestData'].currentValue) {
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
      organizationalUnitName: ['', Validators.required],
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
    this.requestForm.get('milestoneID')?.valueChanges.subscribe((milestoneId) => {
      const selectedMilestone = this.milestones.find(m => m.id === milestoneId);
      if (selectedMilestone) {
        this.requestForm.patchValue({
          mileStoneDate: selectedMilestone.targetdate,
        }, { emitEvent: false });
      }
    });

    // Coordinator selection listener
    this.requestForm.get('recipientID')?.valueChanges.subscribe((coordinatorId) => {
      const selectedCoordinator = this.coordinators.find(c => c.id === coordinatorId);
      if (selectedCoordinator) {
        this.requestForm.patchValue({
          coordinatorName: selectedCoordinator.fullName,
        }, { emitEvent: false });
      }
    });

    // Approver selection listener
    this.requestForm.get('approverID')?.valueChanges.subscribe((approverId) => {
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
  }

  onSubmit(): void {
    if (this.requestForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const model = this.convertFormToModel();

    this.inforService.updateRequestRequest(model).subscribe({
      next: () => {
        this.save.emit(model);
        this.isSubmitting = false;
        this.onCancel(); 
      },
      error: (err) => {
        console.error('Error saving request:', err);
        this.isSubmitting = false;
        
      }
    });
  }

  private convertFormToModel(): InformationRequestModel {
    const formValue = this.requestForm.value;

    return {
      id: formValue.id,
      requestNumber: formValue.requestNumber,
      sirYear: formValue.sirYear,
      mileStoneDate: formValue.mileStoneDate,
      submissionType: formValue.submissionType,
      organizationalUnitName: formValue.organizationalUnitName,
      coordinatorName: formValue.coordinatorName,
      worksheetType: formValue.worksheetType,
      approverName: formValue.approverName,
      requestStatus: formValue.requestStatus,
      approverID: formValue.selectedApproverId,
      recipientID: formValue.selectedCoordinatorId,
      milestoneID: formValue.selectedMilestoneId,
      approver: formValue.selectedApproverId,
      informationRequest: formValue.requestNumber,
      requestStatusType: formValue.requestStatus,
      informationSought: formValue.informationSought,
      spqComment: formValue.spqComment,
      worksheetAvailabilityDate: formValue.worksheetAvailabilityDate,
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
    this.cancel.emit();
    
  }
}