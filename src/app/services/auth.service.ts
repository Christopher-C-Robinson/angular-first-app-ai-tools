import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { 
  catchError, 
  map, 
  tap, 
  retry, 
  retryWhen, 
  delay,
  delayWhen,
  take,
  switchMap,
  finalize
} from 'rxjs/operators';

import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  AuthError,
  AuthErrorCode 
} from '../models/auth.interface';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_BASE = environment.apiBaseUrl;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';

  // State management with BehaviorSubjects for reactive patterns
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Public observables for components to subscribe to
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {
    this.initializeAuthState();
  }

  /**
   * Initialize authentication state from local storage
   */
  private initializeAuthState(): void {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userJson = localStorage.getItem(this.USER_KEY);
      
      if (token && userJson) {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      }
    } catch (error) {
      console.warn('Failed to restore auth state:', error);
      this.clearAuthState();
    }
  }

  /**
   * Login with email and password
   * Implements retry logic and comprehensive error handling
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.setLoading(true);
    
    return this.validateCredentials(credentials).pipe(
      switchMap(() => this.performLogin(credentials)),
      retry({
        count: 2,
        delay: (error, retryCount) => {
          // Only retry on network errors, not auth errors
          if (this.isRetryableError(error)) {
            return timer(retryCount * 1000);
          }
          throw error;
        }
      }),
      tap(response => this.handleSuccessfulAuth(response)),
      catchError(error => this.errorHandler.handleError(error)),
      finalize(() => this.setLoading(false))
    );
  }

  /**
   * Register new user account
   */
  register(userData: RegisterData): Observable<AuthResponse> {
    this.setLoading(true);
    
    return this.validateRegistrationData(userData).pipe(
      switchMap(() => this.performRegistration(userData)),
      retry({
        count: 1,
        delay: (error, retryCount) => {
          if (this.isRetryableError(error)) {
            return timer(retryCount * 2000);
          }
          throw error;
        }
      }),
      tap(response => this.handleSuccessfulAuth(response)),
      catchError(error => this.errorHandler.handleError(error)),
      finalize(() => this.setLoading(false))
    );
  }

  /**
   * Logout user and clear authentication state
   */
  logout(): Observable<boolean> {
    this.setLoading(true);
    
    return this.performLogout().pipe(
      tap(() => this.clearAuthState()),
      map(() => true),
      catchError(error => {
        // Even if logout fails on server, clear local state
        this.clearAuthState();
        console.warn('Logout failed on server, but local state cleared:', error);
        return of(true);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      return this.errorHandler.handleError({
        code: AuthErrorCode.TOKEN_EXPIRED,
        message: 'No refresh token available',
        userMessage: 'Please log in again.'
      });
    }

    return this.performTokenRefresh(refreshToken).pipe(
      tap(response => this.handleSuccessfulAuth(response)),
      retryWhen(errors => 
        errors.pipe(
          delayWhen(() => timer(1000)),
          take(2)
        )
      ),
      catchError(error => {
        this.clearAuthState();
        return this.errorHandler.handleError(error);
      })
    );
  }

  /**
   * Check if current user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Private helper methods

  private validateCredentials(credentials: LoginCredentials): Observable<void> {
    const errors: string[] = [];
    
    if (!credentials.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(credentials.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!credentials.password?.trim()) {
      errors.push('Password is required');
    } else if (credentials.password.length < MIN_PASSWORD_LENGTH) {
      errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }
    
    if (errors.length > 0) {
      return this.errorHandler.handleError({
        name: 'ValidationError',
        message: errors.join(', ')
      });
    }
    
    return of(void 0);
  }

  private validateRegistrationData(userData: RegisterData): Observable<void> {
    const errors: string[] = [];
    
    if (!userData.name?.trim()) {
      errors.push('Name is required');
    }
    
    if (!userData.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(userData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!userData.password?.trim()) {
      errors.push('Password is required');
    } else if (userData.password.length < MIN_PASSWORD_LENGTH) {
      errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }
    
    if (errors.length > 0) {
      return this.errorHandler.handleError({
        name: 'ValidationError',
        message: errors.join(', ')
      });
    }
    
    return of(void 0);
  }

  private performLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock implementation - replace with actual HTTP call
    return of({
      user: {
        id: '1',
        email: credentials.email,
        name: 'Mock User',
        role: 'user'
      },
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now()
    }).pipe(
      delay(1000), // Simulate network delay
      map(response => {
        // Simulate authentication failure for demo
        if (credentials.email === DEMO_FAIL_EMAIL) {
          throw { status: 401, error: { message: 'Invalid credentials' } };
        }
        return response;
      })
    );
  }

  private performRegistration(userData: RegisterData): Observable<AuthResponse> {
    // Mock implementation - replace with actual HTTP call
    return of({
      user: {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: 'user'
      },
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now()
    }).pipe(
      delay(1500), // Simulate network delay
      map(response => {
        // Simulate email already exists error for demo
        if (userData.email === DEMO_EXISTING_EMAIL) {
          throw { status: 409, error: { message: 'Email already exists' } };
        }
        return response;
      })
    );
  }

  private performLogout(): Observable<void> {
    // Mock implementation - replace with actual HTTP call
    return of(void 0).pipe(delay(500));
  }

  private performTokenRefresh(refreshToken: string): Observable<AuthResponse> {
    // Mock implementation - replace with actual HTTP call
    return of({
      user: this.currentUserSubject.value!,
      token: 'refreshed_token_' + Date.now(),
      refreshToken: 'refreshed_refresh_token_' + Date.now()
    }).pipe(delay(500));
  }

  private handleSuccessfulAuth(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    
    if (response.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    }
    
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuthState(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private setLoading(loading: boolean): void {
    this.isLoadingSubject.next(loading);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isRetryableError(error: any): boolean {
    // Only retry on network errors or 5xx server errors
    return error?.name === 'NetworkError' || 
           (error?.status >= 500 && error?.status < 600);
  }
}