
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerModel } from '../../../../shared/manager-model';


@Component({
  selector: 'app-manager-add-edit',
  standalone: false,
  
  templateUrl: './manager-add-edit.component.html',
  styleUrl: './manager-add-edit.component.scss'
})
export class ManagerAddEditComponent implements OnInit {
  @Input() selectedManager: ManagerModel | null = null; // Input parameter
  @Output() save = new EventEmitter<ManagerModel>(); // Output event for saving
  @Output() cancel = new EventEmitter<void>(); // Output event for canceling

  managerForm: FormGroup;

  constructor( private fb: FormBuilder) {
   this.managerForm= this.creatForm(); // Initialize the form
  }

  ngOnInit(): void {
    

   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedManager'] && changes['selectedManager'].currentValue) {
      this.updateForm(this.selectedManager? this.selectedManager : {} as ManagerModel);
    }
  }
  onSubmit(): void {
    if (this.managerForm.invalid) return;

    const manager: ManagerModel = this.managerForm.value;
    this.save.emit(manager); 
  }

  onCancel(): void {
    this.cancel.emit(); 
  }

  creatForm() {
    return this.fb.group({
      id: [this.selectedManager?.id || '0', ],
      ddsuCode: [this.selectedManager?.ddsuCode || '', Validators.required],
      division: [this.selectedManager?.division || '', Validators.required],
      divisionCode: [this.selectedManager?.divisionCode || '', Validators.required],
      sectionCode: [this.selectedManager?.sectionCode || '', Validators.required],
      fullName: [this.selectedManager?.fullName || '', Validators.required],
      functionalTitle: [this.selectedManager?.functionalTitle || '', Validators.required],
      approverRole: [this.selectedManager?.approverRole || false],
      contributorRole: [this.selectedManager?.contributorRole || false],
      personnelNumber: [this.selectedManager?.personnelNumber || '', Validators.required],
    });
  }

  private updateForm(manager: ManagerModel): void {
    this.managerForm.patchValue({
      id: manager.id || '0',
      ddsuCode: manager.ddsuCode || '',
      division: manager.division || '',
      divisionCode: manager.divisionCode || '',
      sectionCode: manager.sectionCode || '',
      fullName: manager.fullName || '',
      functionalTitle: manager.functionalTitle || '',
      approverRole: manager.approverRole || false,
      contributorRole: manager.contributorRole || false,
      personnelNumber: manager.personnelNumber || '',
    });
  }
}
