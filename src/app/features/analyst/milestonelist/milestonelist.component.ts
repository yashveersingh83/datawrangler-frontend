import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MileStoneService } from '../services/milestone.service';
import { MileStoneModel } from '../../../shared/milestone-model';

@Component({
  selector: 'app-milestonelist',
  templateUrl: './milestonelist.component.html',
  styleUrl: './milestonelist.component.scss',standalone:false
})
export class MilestonelistComponent {
  columns: any[];
  mileStones = signal<MileStoneModel[]>([]);
  selectedModel = signal<MileStoneModel | null>(null);
  milestoneForm!: FormGroup;
  popupVisible = false;

  constructor(private milestoneService: MileStoneService, private fb: FormBuilder) {
    this.columns = [
      { dataField: 'id', caption: 'ID', allowEditing: false, visible: false },
      { dataField: 'description', caption: 'Description', allowEditing: true },
      { dataField: 'comments', caption: 'Comments' },
      { dataField: 'targetdate', caption: 'Target Date', dataType: 'date' }
    ];
  }

  ngOnInit(): void {
    this.milestoneService.getMileStoneList().subscribe({
      next: (data) => this.mileStones.set(data),
      error: (error) => console.error('Error fetching milestones:', error)
    });

    this.initForm();
  }

  /** 🔹 Initialize the Angular Reactive Form */
  initForm(): void {
    this.milestoneForm = this.fb.group({
      id: [null],
      description: [''],
      comments: [''],
      targetdate: ['']
    });
  }

  /** 🔹 Open custom popup when double-clicking a row */
  onRowEditingStart(event: any): void {
    const rowData = event.data;
    this.selectedModel.set(rowData);
    this.milestoneForm.patchValue(rowData);
    this.popupVisible = true;
  }

  /** 🔹 Handle Save Button Click */
  onSaveClick(): void {
    if (this.milestoneForm.valid) {
      const updatedData = { ...this.selectedModel(), ...this.milestoneForm.value };

      this.milestoneService.updateMileStone(updatedData).subscribe({
        next: () => {
          // Update the local list
          this.mileStones.set(
            this.mileStones().map(m => (m.Id === updatedData.id ? updatedData : m))
          );
          this.popupVisible = false; // Close popup
        },
        error: (error) => console.error('Error updating milestone:', error)
      });
    }
  }

  /** 🔹 Handle Cancel Button Click */
  onCancelClick(): void {
    //this.popupVisible = false;
  }
}
