import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.fetchUserData().pipe(
      map((user) => {
        if (user) {
          console.log('Inser auth guard' + user);
          return true;
        }
        this.router.navigate(['/error']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/error']);
        return [false];
      })
    );
  }
}
