import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakAuthService } from '../features/authentication/services/keycloak-auth.service';
import { NavigationService } from './navigation.service';
import { NavLink } from './NavLink';

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
  visibleNavLinks: NavLink[] = [];

  constructor(private keycloakAuthService: KeycloakAuthService ,private router: Router,   
    private navigationService: NavigationService) {

  }

  async ngOnInit() {
    this.loadUserProfile();

    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadUserProfile(); // Reload user profile on route change
      }
    });
  }
  async loadUserProfile() {
    const profile = await this.keycloakAuthService.getUserProfile();
    const roles = await this.keycloakAuthService.getUserRoles();
    if (profile) {
      this.userProfile = profile;
      this.userName = profile.firstName || ''; // Replace with correct property if needed
      this.userLastName = profile.lastName || ''; // Replace with correct property if needed
      this.userProfile.roles = roles;


      const context = {
        userRoles: this.userProfile.roles,
        userProfile: this.userProfile,
        featureFlags: { reportsEnabled: true }, // Example: this can come from another FeatureFlagService later
        appMode: 'user', // Example
      };

      this.visibleNavLinks = this.navigationService.getVisibleLinks(context);
    }
  }
  logout(): void {
   this.keycloakAuthService.logout();
  }
}
