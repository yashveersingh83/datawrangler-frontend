import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakAuthService } from '../services/keycloak-auth.service';

/**
 * Ensures more granular role validation by checking both
 * realm-level roles and resource-specific roles.
 */
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

  // Check if the user has the required role
  const hasRequiredRole = (role: string): boolean => {
    const realmRoles = grantedRoles.realmRoles || [];
    const resourceRoles = grantedRoles.resourceRoles || {};

    console.log('Realm Roles:', listRealmRoles());
    console.log('Resource Roles:', listResourceRoles());

    return (
      realmRoles.includes(role) ||
      Object.values(resourceRoles).some((roles) => roles.includes(role))
    );
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
