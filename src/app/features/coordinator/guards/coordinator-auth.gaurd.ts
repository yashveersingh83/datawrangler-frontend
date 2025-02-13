// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// import { Observable } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// import { User } from '../../../shared/user-model';
// import { KeycloakAuthService } from '../../authentication/services/keycloak-auth.service';


// @Injectable({
//   providedIn: 'root',
// })
// export class CoordinatorAuthGuard implements CanActivate {
//   constructor(private authService: KeycloakAuthService , private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.fetchUserData().pipe(
//       map((userList: User[]) => {
//         if (userList) {
//           // Check if a user with ID = 2 and Role_Coordinator exists
//           const isUserCoordinator = userList.some(
//             (user) => user.Id == "4" && user.roles.includes('Role_Coordinator')
//           );

//           if (isUserCoordinator) {
//             console.log('CoordinatorAuthGuard: Access granted');
//             return true;
//           }
//         }
//         // Navigate to the error page if the condition is not met
//         this.router.navigate(['/error']);
//         return false;
//       }),
//       catchError(() => {
//         // Handle errors by navigating to the error page
//         this.router.navigate(['/error']);
//         return [false];
//       })
//     );
//   }
// }