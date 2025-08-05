import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthError } from '../models/auth.interface';

@Component({
  selector: 'app-error-display',
  imports: [CommonModule],
  template: `
    @if (error()) {
      <div class="error-container" [class]="'error-' + error()!.code.toLowerCase()">
        <div class="error-icon">
          <span>⚠️</span>
        </div>
        <div class="error-content">
          <p class="error-message">{{ error()!.userMessage }}</p>
          @if (showDetails()) {
            <details class="error-details">
              <summary>Technical Details</summary>
              <p><strong>Code:</strong> {{ error()!.code }}</p>
              <p><strong>Message:</strong> {{ error()!.message }}</p>
              <p><strong>Time:</strong> {{ error()!.timestamp | date:'medium' }}</p>
            </details>
          }
        </div>
        <button 
          class="error-close" 
          (click)="onDismiss()"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      </div>
    }
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      margin: 16px 0;
      border-radius: 8px;
      border-left: 4px solid #dc3545;
      background-color: #f8d7da;
      color: #721c24;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    }

    .error-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .error-content {
      flex-grow: 1;
    }

    .error-message {
      margin: 0 0 8px 0;
      font-weight: 500;
      line-height: 1.4;
    }

    .error-details {
      margin-top: 8px;
      font-size: 0.875rem;
    }

    .error-details summary {
      cursor: pointer;
      color: #6c757d;
      margin-bottom: 8px;
    }

    .error-details summary:hover {
      color: #495057;
    }

    .error-details p {
      margin: 4px 0;
      padding-left: 16px;
    }

    .error-close {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #721c24;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .error-close:hover {
      background-color: rgba(114, 28, 36, 0.1);
    }

    /* Different error types */
    .error-validation_error {
      border-left-color: #ffc107;
      background-color: #fff3cd;
      color: #856404;
    }

    .error-validation_error .error-close {
      color: #856404;
    }

    .error-network_error {
      border-left-color: #6f42c1;
      background-color: #e2d9f3;
      color: #432874;
    }

    .error-network_error .error-close {
      color: #432874;
    }

    .error-server_error {
      border-left-color: #dc3545;
      background-color: #f8d7da;
      color: #721c24;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ErrorDisplayComponent {
  error = input<AuthError | null>(null);
  showDetails = input<boolean>(false);
  dismiss = output<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }
}