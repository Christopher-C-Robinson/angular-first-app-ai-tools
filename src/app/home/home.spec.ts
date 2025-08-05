import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';

describe('Home Component (Dashboard)', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, HousingLocation]
    }).compileComponents();
    
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with housing location list', () => {
    expect(component.housingLocationList).toBeDefined();
    expect(component.housingLocationList.length).toBeGreaterThan(0);
    expect(component.housingLocationList.length).toBe(10);
  });

  it('should have correct baseUrl property', () => {
    expect(component.baseUrl).toBe('https://angular.dev/assets/images/tutorials/common');
  });

  it('should render search form with input and button', () => {
    const compiled = fixture.nativeElement;
    const searchInput = compiled.querySelector('input[type="text"]');
    const searchButton = compiled.querySelector('button.primary');
    
    expect(searchInput).toBeTruthy();
    expect(searchInput.placeholder).toBe('Filter by city');
    expect(searchButton).toBeTruthy();
    expect(searchButton.textContent.trim()).toBe('Search');
  });

  it('should render housing locations in the results section', () => {
    const compiled = fixture.nativeElement;
    const resultsSection = compiled.querySelector('section.results');
    const housingLocationElements = compiled.querySelectorAll('app-housing-location');
    
    expect(resultsSection).toBeTruthy();
    expect(housingLocationElements.length).toBe(component.housingLocationList.length);
  });

  it('should have housing locations with required properties', () => {
    component.housingLocationList.forEach((location: HousingLocationInfo) => {
      expect(location.id).toBeDefined();
      expect(location.name).toBeDefined();
      expect(location.city).toBeDefined();
      expect(location.state).toBeDefined();
      expect(location.photo).toBeDefined();
      expect(location.availableUnits).toBeDefined();
      expect(typeof location.wifi).toBe('boolean');
      expect(typeof location.laundry).toBe('boolean');
    });
  });

  it('should have proper photo URLs for all housing locations', () => {
    component.housingLocationList.forEach((location: HousingLocationInfo) => {
      expect(location.photo).toContain(component.baseUrl);
      expect(location.photo).toMatch(/\.(jpg|jpeg|png)$/);
    });
  });

  // Edge case: Testing when housing list is empty
  it('should handle empty housing location list gracefully', () => {
    component.housingLocationList = [];
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const housingLocationElements = compiled.querySelectorAll('app-housing-location');
    
    expect(housingLocationElements.length).toBe(0);
    expect(component.housingLocationList.length).toBe(0);
  });

  // Edge case: Testing data integrity
  it('should maintain data consistency across different cities', () => {
    const cities = component.housingLocationList.map(location => location.city);
    const uniqueCities = [...new Set(cities)];
    
    expect(uniqueCities.length).toBeGreaterThan(1);
    expect(uniqueCities).toContain('Chicago');
    expect(uniqueCities).toContain('Oakland');
    expect(uniqueCities).toContain('Santa Monica');
  });

  // Edge case: Testing available units range
  it('should have valid available units range (edge case)', () => {
    component.housingLocationList.forEach((location: HousingLocationInfo) => {
      expect(location.availableUnits).toBeGreaterThanOrEqual(0);
      expect(location.availableUnits).toBeLessThanOrEqual(100);
    });
  });

  it('should render template elements correctly', () => {
    const compiled = fixture.nativeElement;
    
    // Check main structure
    expect(compiled.querySelector('section')).toBeTruthy();
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('section.results')).toBeTruthy();
    
    // Check form elements
    const form = compiled.querySelector('form');
    expect(form.querySelector('input')).toBeTruthy();
    expect(form.querySelector('button')).toBeTruthy();
  });

  it('should have correct CSS classes applied', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    const resultsSection = compiled.querySelector('.results');
    
    expect(button.classList.contains('primary')).toBe(true);
    expect(resultsSection).toBeTruthy();
  });
});