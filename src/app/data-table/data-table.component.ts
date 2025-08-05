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
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Company</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            <!-- Using trackBy function for optimal performance -->
            <tr *cdkVirtualFor="let item of data; trackBy: trackByFn" class="table-row">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.department }}</td>
              <td>{{ item.salary | currency }}</td>
              <td>{{ item.joinDate | date }}</td>
            </tr>
          </tbody>
        </table>
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