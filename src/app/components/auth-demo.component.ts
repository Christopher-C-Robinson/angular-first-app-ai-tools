import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorDisplayComponent } from './error-display.component';
import { AuthError, LoginCredentials, RegisterData, User } from '../models/auth.interface';

@Component({
  selector: 'app-auth-demo',
  imports: [CommonModule, FormsModule, ErrorDisplayComponent],
  template: `
    <div class="auth-demo">
      <h2>Authentication Demo</h2>
      
      <!-- Current User Status -->
      <div class="user-status">
        @if (currentUser()) {
          <div class="user-info">
            <h3>Welcome, {{ currentUser()!.name }}!</h3>
            <p>Email: {{ currentUser()!.email }}</p>
            <button 
              class="btn btn-secondary" 
              (click)="logout()"
              [disabled]="isLoading()"
            >
              @if (isLoading()) {
                Logging out...
              } @else {
                Logout
              }
            </button>
          </div>
        } @else {
          <p>Please log in or register to continue.</p>
        }
      </div>

      <!-- Error Display -->
      <app-error-display
        [error]="currentError()"
        [showDetails]="true"
        (dismiss)="clearError()"
      />

      @if (!currentUser()) {
        <!-- Auth Mode Toggle -->
        <div class="mode-toggle">
          <button 
            class="btn"
            [class.btn-primary]="authMode() === 'login'"
            [class.btn-outline]="authMode() === 'register'"
            (click)="setAuthMode('login')"
          >
            Login
          </button>
          <button 
            class="btn"
            [class.btn-primary]="authMode() === 'register'"
            [class.btn-outline]="authMode() === 'login'"
            (click)="setAuthMode('register')"
          >
            Register
          </button>
        </div>

        <!-- Login Form -->
        @if (authMode() === 'login') {
          <form class="auth-form" (ngSubmit)="login()">
            <h3>Login</h3>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                id="email"
                type="email"
                [(ngModel)]="loginForm.email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                id="password"
                type="password"
                [(ngModel)]="loginForm.password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="isLoading()"
            >
              @if (isLoading()) {
                Logging in...
              } @else {
                Login
              }
            </button>
            <div class="demo-accounts">
              <p><strong>Demo accounts for testing:</strong></p>
              <button type="button" class="btn btn-link" (click)="fillLoginDemo('success')">
                Success: user@example.com
              </button>
              <button type="button" class="btn btn-link" (click)="fillLoginDemo('fail')">
                Fail: fail@example.com
              </button>
            </div>
          </form>
        }

        <!-- Register Form -->
        @if (authMode() === 'register') {
          <form class="auth-form" (ngSubmit)="register()">
            <h3>Register</h3>
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                id="name"
                type="text"
                [(ngModel)]="registerForm.name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div class="form-group">
              <label for="regEmail">Email:</label>
              <input
                id="regEmail"
                type="email"
                [(ngModel)]="registerForm.email"
                name="regEmail"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="form-group">
              <label for="regPassword">Password:</label>
              <input
                id="regPassword"
                type="password"
                [(ngModel)]="registerForm.password"
                name="regPassword"
                placeholder="Enter your password (min 8 chars)"
                required
              />
            </div>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="isLoading()"
            >
              @if (isLoading()) {
                Registering...
              } @else {
                Register
              }
            </button>
            <div class="demo-accounts">
              <p><strong>Demo emails for testing:</strong></p>
              <button type="button" class="btn btn-link" (click)="fillRegisterDemo('success')">
                Success: new@example.com
              </button>
              <button type="button" class="btn btn-link" (click)="fillRegisterDemo('exists')">
                Exists: exists@example.com
              </button>
            </div>
          </form>
        }
      }
    </div>
  `,
  styles: [`
    .auth-demo {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .user-status {
      margin-bottom: 20px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .user-info h3 {
      margin: 0 0 8px 0;
      color: #28a745;
    }

    .mode-toggle {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .auth-form {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
    }

    .auth-form h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
      color: #555;
    }

    .form-group input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(96, 93, 200, 0.2);
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--secondary-color);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #5a6268;
    }

    .btn-outline {
      background: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }

    .btn-outline:hover:not(:disabled) {
      background: var(--primary-color);
      color: white;
    }

    .btn-link {
      background: none;
      color: var(--primary-color);
      text-decoration: underline;
      padding: 4px 8px;
      font-size: 12px;
    }

    .btn-link:hover {
      color: var(--secondary-color);
    }

    .demo-accounts {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #dee2e6;
    }

    .demo-accounts p {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #6c757d;
    }

    .demo-accounts button {
      margin: 2px 4px;
    }
  `]
})
export class AuthDemoComponent {
  authMode = signal<'login' | 'register'>('login');
  currentError = signal<AuthError | null>(null);
  currentUser = signal<User | null>(null);
  isLoading = signal<boolean>(false);

  loginForm: LoginCredentials = {
    email: '',
    password: ''
  };

  registerForm: RegisterData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {
    // Subscribe to auth service state
    this.authService.currentUser$.subscribe(user => {
      this.currentUser.set(user);
    });

    this.authService.isLoading$.subscribe(loading => {
      this.isLoading.set(loading);
    });
  }

  setAuthMode(mode: 'login' | 'register'): void {
    this.authMode.set(mode);
    this.clearError();
  }

  login(): void {
    this.clearError();
    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.resetForms();
      },
      error: (error: AuthError) => {
        this.currentError.set(error);
      }
    });
  }

  register(): void {
    this.clearError();
    this.authService.register(this.registerForm).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.resetForms();
      },
      error: (error: AuthError) => {
        this.currentError.set(error);
      }
    });
  }

  logout(): void {
    this.clearError();
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.resetForms();
      },
      error: (error: AuthError) => {
        this.currentError.set(error);
      }
    });
  }

  fillLoginDemo(type: 'success' | 'fail'): void {
    if (type === 'success') {
      this.loginForm.email = 'user@example.com';
      this.loginForm.password = 'password123';
    } else {
      this.loginForm.email = 'fail@example.com';
      this.loginForm.password = 'wrongpassword';
    }
  }

  fillRegisterDemo(type: 'success' | 'exists'): void {
    this.registerForm.name = 'Demo User';
    this.registerForm.password = 'password123';
    
    if (type === 'success') {
      this.registerForm.email = 'new@example.com';
    } else {
      this.registerForm.email = 'exists@example.com';
    }
  }

  clearError(): void {
    this.currentError.set(null);
  }

  private resetForms(): void {
    this.loginForm = { email: '', password: '' };
    this.registerForm = { name: '', email: '', password: '' };
  }
}