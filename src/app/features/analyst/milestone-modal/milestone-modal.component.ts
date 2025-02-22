import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MileStoneModel } from '../../../shared/milestone-model';

@Component({
  selector: 'app-milestone-modal',
  standalone:false,
  templateUrl: './milestone-modal.component.html',
  styleUrls: ['./milestone-modal.component.scss']
})
export class MilestoneModalComponent {
  @Input() isEditMode: boolean = false;
  @Input() milestone: MileStoneModel | null = null;
  @Output() save = new EventEmitter<MileStoneModel>();
  @Output() cancel = new EventEmitter<void>();

  milestoneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.milestoneForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      comments: [''],
      targetdate: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.milestone) {
      this.milestoneForm.patchValue(this.milestone);
    } else {
      this.milestoneForm.reset();
    }
  }

  onSubmit() {
    if (this.milestoneForm.valid) {
      this.save.emit(this.milestoneForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.milestoneForm.get(fieldName);
    return field ? field.invalid && (field.touched || field.dirty) : false;
  }
}