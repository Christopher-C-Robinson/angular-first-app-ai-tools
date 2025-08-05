import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousingLocation } from './housing-location';
import { HousingLocationInfo } from '../housinglocation';

describe('HousingLocation Component', () => {
  let component: HousingLocation;
  let fixture: ComponentFixture<HousingLocation>;
  
  const mockHousingLocation: HousingLocationInfo = {
    id: 0,
    name: 'Test Housing Location',
    city: 'Test City',
    state: 'TS',
    photo: 'https://example.com/test.jpg',
    availableUnits: 5,
    wifi: true,
    laundry: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingLocation]
    }).compileComponents();
    
    fixture = TestBed.createComponent(HousingLocation);
    component = fixture.componentInstance;
    
    // Set the required input
    fixture.componentRef.setInput('housingLocation', mockHousingLocation);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display housing location information', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.listing-heading').textContent.trim()).toBe(mockHousingLocation.name);
    expect(compiled.querySelector('.listing-location').textContent.trim()).toBe(`${mockHousingLocation.city}, ${mockHousingLocation.state}`);
  });

  it('should display housing location image with correct attributes', () => {
    const compiled = fixture.nativeElement;
    const image = compiled.querySelector('.listing-photo');
    
    expect(image.src).toBe(mockHousingLocation.photo);
    expect(image.alt).toBe(`Exterior photo of ${mockHousingLocation.name}`);
    expect(image.getAttribute('crossorigin')).toBe('');
  });

  it('should have proper CSS classes', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.listing')).toBeTruthy();
    expect(compiled.querySelector('.listing-photo')).toBeTruthy();
    expect(compiled.querySelector('.listing-heading')).toBeTruthy();
    expect(compiled.querySelector('.listing-location')).toBeTruthy();
  });
});