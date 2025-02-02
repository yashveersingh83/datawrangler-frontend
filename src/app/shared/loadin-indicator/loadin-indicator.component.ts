import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-loadin-indicator',
  imports: [],
  templateUrl: './loadin-indicator.component.html',
  styleUrl: './loadin-indicator.component.css'
})
export class LoadinIndicatorComponent {

  @Input() show: boolean = false; // Control visibility
  @Input() message: string | null = null; // Optional loading message
}
