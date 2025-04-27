import { Component } from '@angular/core';

import { LoadingindicatorService } from './core/utils/loading-indicator';
import { Observable } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // standalone: false,
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,NavbarComponent]
})
export class AppComponent {
  title = 'datawranglerclient';
  public isLoggedIn = false;
  isAppInitialized = false;public userProfile: KeycloakProfile | null = null;
  loading$: Observable<boolean>; 
  constructor(
    private loadingService: LoadingindicatorService,
    private router: Router
    
  )
     {
    this.loading$ = this.loadingService.loading$;
  }
   ngOnInit() {
      
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation Started:', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('Navigation Ended:', event.url);
      } else if (event instanceof NavigationCancel) {
        console.log('Navigation Canceled:', event.url);
      } else if (event instanceof NavigationError) {
        console.error('Navigation Error:', event.error);
      }
      // You can handle other event types here, such as RouteConfigLoadStart if needed
    });
   
  }

  public login() {
    //this.keycloak.login();
  }

  public logout() {
   // this.keycloak.logout();
  }
}
