import { inject, Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {

  private readonly keycloak = inject(Keycloak);
  constructor() {}

  /** 🔹 Check if user is authenticated */
  async isAuthenticated(): Promise<boolean> {
    
    return false;
    //return this.keycloak.isTokenExpired();
  }

  /** 🔹 Get the logged-in user's details */
  async getUserProfile(): Promise<any> {
    //if (!(await this.isAuthenticated())) return null;
    return this.keycloak.loadUserProfile();
  }
  async getToken(): Promise<any> {
    //if (!(await this.isAuthenticated())) return null;
    return this.keycloak.token?.toString();
  }

  /** 🔹 Get user roles */
  getUserRoles(): string[] {
    return this.keycloak.realmAccess?.roles || [];
  }

  /** 🔹 Check if the user has a specific role */
  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  /** 🔹 Trigger Keycloak Login */
  async login(): Promise<void> {
    await this.keycloak.login();
  }

  /** 🔹 Trigger Keycloak Logout */
  async logout(): Promise<void> {
    await this.keycloak.logout();
  }

  /** 🔹 Refresh Token */
  async refreshToken(): Promise<boolean> {
    try {
      await this.keycloak.updateToken(60); // Refresh if token expires in 60s
      return true;
    } catch (error) {
      console.error('Token refresh failed', error);
      return false;
    }
  }
}
