import {Component, OnInit} from '@angular/core';
import {Home} from './home/home';
import {UserProfile} from './user-profile/user-profile';
import {DataTableComponent, TableData} from './data-table/data-table.component';
import {DataGeneratorService} from './services/data-generator.service';

@Component({
  selector: 'app-root',
  imports: [Home, UserProfile, DataTableComponent],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
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
  tableData: TableData[] = [];

  constructor(private dataGenerator: DataGeneratorService) {}

  ngOnInit() {
    // Generate large dataset to test performance optimizations
    console.time('Data Generation');
    this.tableData = this.dataGenerator.generateLargeDataset(10000);
    console.timeEnd('Data Generation');
    console.log(`Generated ${this.tableData.length} records for performance testing`);
  }
}
