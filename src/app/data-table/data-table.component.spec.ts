import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent, TableData } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have trackBy function that returns item id', () => {
    const testItem: TableData = {
      id: 123,
      name: 'Test User',
      email: 'test@example.com',
      city: 'Test City',
      company: 'Test Company',
      salary: 50000,
      department: 'Test Department',
      joinDate: new Date()
    };

    const result = component.trackByFn(0, testItem);
    expect(result).toBe(123);
  });

  it('should render table with data', () => {
    const testData: TableData[] = [{
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      city: 'New York',
      company: 'Test Corp',
      salary: 60000,
      department: 'Engineering',
      joinDate: new Date('2023-01-01')
    }];

    component.data = testData;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('Total Records: 1');
  });
});