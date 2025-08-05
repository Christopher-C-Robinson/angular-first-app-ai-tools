import { Component, ChangeDetectionStrategy, Input, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

export interface TableData {
  id: number;
  name: string;
  email: string;
  city: string;
  company: string;
  salary: number;
  department: string;
  joinDate: Date;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="data-table-container">
      <h2>Performance Optimized Data Table</h2>
      <div class="stats">
        <p>Total Records: {{ data.length }}</p>
        <p>Using: OnPush Change Detection + TrackBy + Virtual Scrolling</p>
      </div>
      
      <!-- Virtual scrolling viewport -->
      <cdk-virtual-scroll-viewport itemSize="50" class="table-viewport">
        <!-- Table header as divs -->
        <div class="data-table-header table-row">
          <div class="table-cell">ID</div>
          <div class="table-cell">Name</div>
          <div class="table-cell">Email</div>
          <div class="table-cell">City</div>
          <div class="table-cell">Company</div>
          <div class="table-cell">Department</div>
          <div class="table-cell">Salary</div>
          <div class="table-cell">Join Date</div>
        </div>
        <!-- Virtual scroll rows as divs -->
        <div
          *cdkVirtualFor="let item of data; trackBy: trackByFn"
          class="table-row"
        >
          <div class="table-cell">{{ item.id }}</div>
          <div class="table-cell">{{ item.name }}</div>
          <div class="table-cell">{{ item.email }}</div>
          <div class="table-cell">{{ item.city }}</div>
          <div class="table-cell">{{ item.company }}</div>
          <div class="table-cell">{{ item.department }}</div>
          <div class="table-cell">{{ item.salary | currency }}</div>
          <div class="table-cell">{{ item.joinDate | date }}</div>
        </div>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() data: TableData[] = [];

  // TrackBy function to optimize ngFor performance
  trackByFn: TrackByFunction<TableData> = (index: number, item: TableData) => {
    return item.id; // Use unique identifier for efficient tracking
  };
}