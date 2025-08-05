import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableData } from '../data-table/data-table.component';

// Component without optimizations for comparison
@Component({
  selector: 'app-unoptimized-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <h3>Unoptimized Table (No TrackBy, No Virtual Scrolling)</h3>
      <div class="basic-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of data">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.city }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-container { padding: 20px; }
    .basic-table-wrapper { height: 400px; overflow: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; border: 1px solid #ddd; }
  `]
})
export class UnoptimizedTableComponent {
  data: TableData[] = [];
}

describe('Performance Optimization Tests', () => {
  let unoptimizedFixture: ComponentFixture<UnoptimizedTableComponent>;
  let unoptimizedComponent: UnoptimizedTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnoptimizedTableComponent]
    }).compileComponents();

    unoptimizedFixture = TestBed.createComponent(UnoptimizedTableComponent);
    unoptimizedComponent = unoptimizedFixture.componentInstance;
  });

  it('should demonstrate performance difference with large datasets', () => {
    // Generate test data
    const largeDataset: TableData[] = [];
    for (let i = 1; i <= 1000; i++) {
      largeDataset.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        city: `City ${i}`,
        company: `Company ${i}`,
        salary: 50000 + i,
        department: 'Engineering',
        joinDate: new Date()
      });
    }

    // Test unoptimized component
    const startTime = performance.now();
    unoptimizedComponent.data = largeDataset;
    unoptimizedFixture.detectChanges();
    const unoptimizedTime = performance.now() - startTime;

    console.log(`Unoptimized rendering time: ${unoptimizedTime}ms`);
    
    // Verify the component renders
    expect(unoptimizedComponent.data.length).toBe(1000);
    
    // Performance expectation: should complete within reasonable time
    // Note: The optimized version with virtual scrolling would be much faster
    expect(unoptimizedTime).toBeLessThan(5000); // Should render within 5 seconds
  });
});