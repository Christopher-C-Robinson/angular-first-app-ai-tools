import {Component, OnInit} from '@angular/core';
import {Home} from './home/home';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ThemeService} from './services/theme.service';
import {AsyncPipe} from '@angular/common';
import {UserProfile} from './user-profile/user-profile';
import {DataTableComponent, TableData} from './data-table/data-table.component';
import {DataGeneratorService} from './services/data-generator.service';

@Component({
  selector: 'app-root',
  imports: [Home, MatToolbarModule, MatButtonModule, MatIconModule, AsyncPipe, UserProfile, DataTableComponent],
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
        <app-user-profile></app-user-profile>
        <app-home></app-home>
        <app-data-table [data]="tableData"></app-data-table>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  title = 'homes';
  isDarkMode$ = this.themeService.isDarkMode$;
  tableData: TableData[] = [];

  constructor(private themeService: ThemeService, private dataGenerator: DataGeneratorService) {}

  ngOnInit() {
    // Generate large dataset to test performance optimizations
    console.time('Data Generation');
    this.tableData = this.dataGenerator.generateLargeDataset(10000);
    console.timeEnd('Data Generation');
    console.log(`Generated ${this.tableData.length} records for performance testing`);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
