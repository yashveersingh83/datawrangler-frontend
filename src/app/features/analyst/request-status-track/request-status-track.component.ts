import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-status-track',
  standalone: false,
  templateUrl: './request-status-track.component.html',
  styleUrls: ['./request-status-track.component.scss'] // small typo fixed here
})
export class RequestStatusTrackComponent implements OnInit {

  @Input() currentStatus: { requestStatusID: string } = { requestStatusID: '1' };
  @Input() statuses: any[] = []; // Array of statuses

  currentStatusIntId: number = 0;

  constructor() { }

  ngOnInit(): void {
    const statusIndex = this.statuses.findIndex(status => status.id === this.currentStatus.requestStatusID);
    if (statusIndex >= 0) {
      this.currentStatusIntId = this.statuses[statusIndex].intId;
    }
  }

  getIcon(status: string, isActive: boolean, isCompleted: boolean): string {
    if (isCompleted) {
      return '✅'; // Completed icon
    } else if (isActive) {
      switch (status) {
        case 'New': return '🆕';
        case 'Draft': return '✍️';
        case 'Released': return '📤';
        case 'Confirmed': return '☑️';
        case 'Approved': return '🏆';
        default: return '🔘';
      }
    } else {
      return '⚪'; // Future step (upcoming) icon
    }
  }
}
