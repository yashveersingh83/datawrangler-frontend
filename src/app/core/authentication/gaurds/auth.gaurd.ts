import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakAuthService } from '../services/keycloak-auth.service';


const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles, keycloak } = authData;
  const keycloakAuthService = inject(KeycloakAuthService);
  if (!authenticated) {
    // Redirect the user to the Keycloak login page
      keycloakAuthService.login()
    // await keycloak.login({
    //   redirectUri: window.location.origin + state.url // Redirect back to the requested page after login
    // });
    return false; // Prevent further execution
  }

  const requiredRole = route.data['role'];
  if (!requiredRole) {
    return false; // If no role is required, deny access
  }

  // List all realm-level roles
  const listRealmRoles = (): string[] => {
    return grantedRoles.realmRoles || [];
  };

  // List all resource-specific roles
  const listResourceRoles = (): Record<string, string[]> => {
    return grantedRoles.resourceRoles || {};
  };

  const hasRequiredRole = (roles: string[] | string): boolean => {
    const allRoles = [
      ...(grantedRoles.realmRoles || []),
      ...Object.values(grantedRoles.resourceRoles || {}).flat(),
    ];
  
    console.log('Granted Roles:', grantedRoles);
    console.log('All Roles:', allRoles);
  
    // Normalize roles to an array
    const roleArray = Array.isArray(roles) ? roles : roles ? [roles] : [];
  
    // Check if ANY role matches
    const anyRoleMatched = roleArray.some(role => allRoles.includes(role));
    return anyRoleMatched;
  };
  
  

  
  if (hasRequiredRole(requiredRole)) {
    return true;
  }

  // Redirect to an error page if the user does not have the required role
  const router = inject(Router);
  return router.parseUrl('/error');
};

// Create the Keycloak Auth Guard
export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
