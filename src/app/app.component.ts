import { Component } from '@angular/core';

import { LoadingindicatorService } from './core/utils/loading-indicator';
import { Observable } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

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
    private loadingService: LoadingindicatorService
    
  )
     {
    this.loading$ = this.loadingService.loading$;
  }
  async ngOnInit() {
      
    
   
  }

  public login() {
    //this.keycloak.login();
  }

  public logout() {
   // this.keycloak.logout();
  }
}
