import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthError, AuthErrorCode } from '../models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  
  /**
   * Transforms HTTP errors and other errors into user-friendly AuthError objects
   */
  handleError(error: any): Observable<never> {
    const authError = this.createAuthError(error);
    console.error('Auth Error:', authError);
    return throwError(() => authError);
  }

  /**
   * Creates a standardized AuthError from various error types
   */
  private createAuthError(error: any): AuthError {
    const timestamp = new Date();
    
    // Handle HTTP errors
    if (error?.status) {
      return this.handleHttpError(error, timestamp);
    }
    
    // Handle network errors
    if (error?.name === 'NetworkError' || error?.message?.includes('network')) {
      return {
        code: AuthErrorCode.NETWORK_ERROR,
        message: error.message || 'Network error occurred',
        userMessage: 'Please check your internet connection and try again.',
        timestamp
      };
    }
    
    // Handle validation errors
    if (error?.name === 'ValidationError') {
      return {
        code: AuthErrorCode.VALIDATION_ERROR,
        message: error.message,
        userMessage: 'Please check your input and try again.',
        timestamp
      };
    }
    
    // Default error
    return {
      code: AuthErrorCode.SERVER_ERROR,
      message: error?.message || 'An unexpected error occurred',
      userMessage: 'Something went wrong. Please try again later.',
      timestamp
    };
  }

  /**
   * Handles HTTP-specific errors
   */
  private handleHttpError(error: any, timestamp: Date): AuthError {
    switch (error.status) {
      case 400:
        return {
          code: AuthErrorCode.VALIDATION_ERROR,
          message: error.error?.message || 'Bad request',
          userMessage: 'Please check your input and try again.',
          timestamp
        };
        
      case 401:
        return {
          code: AuthErrorCode.UNAUTHORIZED,
          message: error.error?.message || 'Unauthorized',
          userMessage: 'Invalid email or password. Please try again.',
          timestamp
        };
        
      case 403:
        return {
          code: AuthErrorCode.UNAUTHORIZED,
          message: error.error?.message || 'Forbidden',
          userMessage: 'You do not have permission to perform this action.',
          timestamp
        };
        
      case 404:
        return {
          code: AuthErrorCode.USER_NOT_FOUND,
          message: error.error?.message || 'Not found',
          userMessage: 'Account not found. Please check your email address.',
          timestamp
        };
        
      case 409:
        return {
          code: AuthErrorCode.EMAIL_ALREADY_EXISTS,
          message: error.error?.message || 'Conflict',
          userMessage: 'An account with this email already exists.',
          timestamp
        };
        
      case 500:
      case 502:
      case 503:
      default:
        return {
          code: AuthErrorCode.SERVER_ERROR,
          message: error.error?.message || 'Server error',
          userMessage: 'Server is temporarily unavailable. Please try again later.',
          timestamp
        };
    }
  }

  /**
   * Gets user-friendly error message for display
   */
  getUserFriendlyMessage(error: AuthError): string {
    return error.userMessage;
  }
}