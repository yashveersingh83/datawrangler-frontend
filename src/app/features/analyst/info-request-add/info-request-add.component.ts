import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationRequestModel } from '../../../shared/info-request-model';
import { ManagerModel } from '../../../shared/manager-model';
import { MileStoneModel } from '../../../shared/milestone-model';

@Component({
  selector: 'app-info-request-add',
  standalone:false,
  templateUrl: './info-request-add.component.html',
  styleUrls: ['./info-request-add.component.scss']
})
export class InfoRequestAddComponent implements OnInit, OnChanges {

  @Input() requestData: InformationRequestModel | null = null;
  @Input() submissionTypes: string[] = [];
  @Input() coordinators: ManagerModel[] = [];
  @Input() approvers: ManagerModel[] = [];
  @Input() milestones: MileStoneModel[] = [];
  @Output() save = new EventEmitter<InformationRequestModel>();
  @Output() cancel = new EventEmitter<void>();

  requestForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      requestStatus: ['', Validators.required],
      selectedApproverId: ['', Validators.required],
      selectedmileStoneId: ['', Validators.required],
      selectedCoordinatorId: ['', Validators.required],
      selectedMilestoneId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['milestones'] || changes['requestData'] || changes['coordinators'] || changes['approvers']) {
      this.updateForm();
    }
  }

  updateForm(): void {
    if (this.requestData) {
      const selectedApprover = this.approvers.find(a => a.id === this.requestData?.approverID);
      const selectedCoordinator = this.coordinators.find(c => c.id === this.requestData?.recipientID);
      const selectedMilestone = this.milestones.find(c => c.id === this.requestData?.milestoneID);
      console.log('targetDate' +  JSON.stringify(selectedMilestone));
      this.requestForm.patchValue({
        ...this.requestData,
        selectedApproverId: selectedApprover ? selectedApprover.id : null,
        selectedCoordinatorId: selectedCoordinator ? selectedCoordinator.id : null,
        selectedMilestoneId: selectedMilestone ? selectedMilestone.id : null
      });
    }
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.save.emit(this.requestForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}