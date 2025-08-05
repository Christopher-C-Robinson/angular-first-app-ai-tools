import {Component} from '@angular/core';
import {Home} from './home/home';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ThemeService} from './services/theme.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Home, MatToolbarModule, MatButtonModule, MatIconModule, AsyncPipe],
  template: `
    <main>
      <mat-toolbar class="toolbar">
        <div class="brand-container">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </div>
        <span class="spacer"></span>
        <button mat-icon-button (click)="toggleTheme()" [title]="(isDarkMode$ | async) ? 'Switch to light mode' : 'Switch to dark mode'">
          <mat-icon>{{ (isDarkMode$ | async) ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'homes';
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
