import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { from, switchMap } from 'rxjs';
import { KeycloakAuthService } from '../features/authentication/services/keycloak-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakAuthService = inject(KeycloakAuthService);

  return from(keycloakAuthService.getToken()).pipe(
    switchMap(token => {
      if (token) {
        
        const clonedReq = req.clone({
          setHeaders: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` }
        });

        //console.log('auth interceptor--> ' +clonedReq.headers.get('Authorization'));


        return next(clonedReq);
      }
      return next(req);
    })
  );
};
