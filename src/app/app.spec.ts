import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { Home } from './home/home';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Home]
    }).compileComponents();
    
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title property', () => {
    expect(component.title).toBe('homes');
  });

  it('should render header with brand logo', () => {
    const compiled = fixture.nativeElement;
    const header = compiled.querySelector('header.brand-name');
    const logo = compiled.querySelector('.brand-logo');
    
    expect(header).toBeTruthy();
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('/assets/logo.svg');
    expect(logo.alt).toBe('logo');
  });

  it('should render main content structure', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('main')).toBeTruthy();
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('section.content')).toBeTruthy();
    expect(compiled.querySelector('app-home')).toBeTruthy();
  });
});