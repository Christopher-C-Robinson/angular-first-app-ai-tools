import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'angular-homes-theme';
  private darkModeSubject = new BehaviorSubject<boolean>(this.getStoredTheme());
  
  isDarkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  toggleTheme(): void {
    const newTheme = !this.darkModeSubject.value;
    this.darkModeSubject.next(newTheme);
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
  }

  private getStoredTheme(): boolean {
    const stored = localStorage.getItem(this.THEME_KEY);
    return stored ? JSON.parse(stored) : false;
  }

  private storeTheme(isDark: boolean): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(isDark));
  }

  private applyTheme(isDark: boolean): void {
    document.body.style.colorScheme = isDark ? 'dark' : 'light';
    
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
}