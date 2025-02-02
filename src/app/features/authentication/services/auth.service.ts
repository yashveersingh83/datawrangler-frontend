import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // Fetch user data
  fetchUserData(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/userlist`).pipe(
      tap((user) => 
        {
          this.currentUser = user; console.log(user) 

      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        this.router.navigate(['/error']); // Redirect to error page
        return throwError(error);
      })
    );
  }

  // Initialize user data
  initializeUser(): Promise<void> {
    return this.fetchUserData()
      .toPromise()
      .then(() => Promise.resolve())
      .catch(() => Promise.resolve()); // Ensure app continues to load even if there's an error
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
