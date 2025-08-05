import { Injectable } from '@angular/core';
import { TableData } from '../data-table/data-table.component';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {
  private firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica',
    'William', 'Ashley', 'James', 'Amanda', 'Daniel', 'Stephanie', 'Matthew',
    'Elizabeth', 'Christopher', 'Samantha', 'Andrew', 'Rachel', 'Joshua',
    'Megan', 'Ryan', 'Jennifer', 'Brandon', 'Nicole', 'Benjamin', 'Lauren'
  ];

  private lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez'
  ];

  private cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville',
    'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville'
  ];

  private companies = [
    'TechCorp Inc.', 'Global Solutions', 'Innovative Systems', 'DataFlow Ltd.',
    'CloudTech Solutions', 'NextGen Software', 'Digital Dynamics', 'Smart Innovations',
    'Future Technologies', 'Advanced Analytics', 'Cyber Solutions', 'Tech Pioneers',
    'Information Systems', 'Software Solutions', 'Data Analytics Co.', 'Cloud Computing Inc.',
    'Digital Transformation', 'AI Solutions', 'Machine Learning Corp.', 'Big Data Systems'
  ];

  private departments = [
    'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance',
    'Operations', 'Product Management', 'Customer Service', 'Quality Assurance',
    'Research & Development', 'IT Support', 'Business Development', 'Legal',
    'Administration', 'Procurement', 'Training', 'Security', 'Analytics'
  ];

  generateLargeDataset(size: number = 10000): TableData[] {
    const data: TableData[] = [];
    
    for (let i = 1; i <= size; i++) {
      data.push({
        id: i,
        name: this.getRandomName(),
        email: this.generateEmail(),
        city: this.getRandomItem(this.cities),
        company: this.getRandomItem(this.companies),
        salary: this.getRandomSalary(),
        department: this.getRandomItem(this.departments),
        joinDate: this.getRandomDate()
      });
    }
    
    return data;
  }

  private getRandomName(): string {
    const firstName = this.getRandomItem(this.firstNames);
    const lastName = this.getRandomItem(this.lastNames);
    return `${firstName} ${lastName}`;
  }

  private generateEmail(): string {
    const firstName = this.getRandomItem(this.firstNames).toLowerCase();
    const lastName = this.getRandomItem(this.lastNames).toLowerCase();
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'email.com'];
    const domain = this.getRandomItem(domains);
    return `${firstName}.${lastName}@${domain}`;
  }

  private getRandomSalary(): number {
    return Math.floor(Math.random() * 150000) + 30000; // $30k - $180k
  }

  private getRandomDate(): Date {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}