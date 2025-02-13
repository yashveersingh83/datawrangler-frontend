import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakAuthService } from '../features/authentication/services/keycloak-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userProfile: any;
  userName: string = '';
  userLastName: string = '';


  constructor(private keycloakAuthService: KeycloakAuthService) {}

 async ngOnInit() {
  const profile = await this.keycloakAuthService.getUserProfile();
  if (profile) {
    this.userProfile = profile;
    this.userName = profile.firstName || ''; // Replace with correct property if needed
    this.userLastName = profile.lastName || ''; // Replace with correct property if needed
  }

  const token = await this.keycloakAuthService.getToken();
  if (token) {
   // console.log('Token');
   // console.log(token);
  }

  }

  logout(): void {
   
  }
}
