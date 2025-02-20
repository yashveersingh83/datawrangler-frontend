import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MileStoneService } from '../services/milestone.service';
import { MileStoneModel } from '../../../shared/milestone-model';

@Component({
  selector: 'app-milestonelist',
  standalone:false,
  templateUrl: './milestonelist.component.html',
  styleUrls: ['./milestonelist.component.scss']
})
export class MilestonelistComponent implements OnInit {
  mileStones: MileStoneModel[] = [];
  milestoneForm: FormGroup;
  popupVisible = false;
  selectedMilestone: MileStoneModel ={id:"0",Comments:'',Description:'',SIRYear:0,
    Targetdate:new Date()};

  constructor(
    private milestoneService: MileStoneService,
    private fb: FormBuilder
  ) {
    this.milestoneForm = this.fb.group({
      Id: [''],
      description: [''],
      comments: [''],
      targetdate: ['']
    });
  }

  ngOnInit(): void {
    this.loadMilestones();
  }

  loadMilestones() {
    this.milestoneService.getMileStoneList().subscribe((data) => {
      this.mileStones = data;
    });
  }


  onRowInserted(e: any) {
    this.milestoneService.addMileStone(e.data).subscribe(() => this.loadMilestones());
  }

  onRowUpdated(e: any) {
    this.milestoneService.updateMileStone(e.data).subscribe(() => this.loadMilestones());
  }

  onRowRemoved(e: any) {
    this.milestoneService.deleteMileStone(e.data).subscribe(() => this.loadMilestones());
  }
}
