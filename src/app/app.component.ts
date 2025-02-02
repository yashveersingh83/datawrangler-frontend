import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/authentication/services/auth.service';
import { LoadingindicatorService } from './core/utils/loading-indicator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isAppInitialized = false;
  loading$: Observable<boolean>; 
  constructor(private authService: AuthService,private loadingService: LoadingindicatorService) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit() {
      
    this.isAppInitialized = !!this.authService.fetchUserData();
   
  }
}
