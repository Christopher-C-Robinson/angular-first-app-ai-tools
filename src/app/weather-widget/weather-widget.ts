import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';
import { WeatherData, WeatherState } from '../weather.models';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weather-widget">
      <h3>Current Weather</h3>
      
      <div class="weather-content" *ngIf="!weatherState.loading && !weatherState.error && weatherState.data">
        <div class="weather-main">
          <div class="temperature">{{ Math.round(weatherState.data.main.temp) }}°C</div>
          <div class="description">{{ weatherState.data.weather[0].description | titlecase }}</div>
        </div>
        <div class="weather-details">
          <div class="location">{{ weatherState.data.name }}, {{ weatherState.data.sys.country }}</div>
          <div class="feels-like">Feels like {{ Math.round(weatherState.data.main.feels_like) }}°C</div>
          <div class="humidity">Humidity: {{ weatherState.data.main.humidity }}%</div>
        </div>
      </div>

      <div class="loading" *ngIf="weatherState.loading">
        <div class="spinner"></div>
        <p>Loading weather data...</p>
      </div>

      <div class="error" *ngIf="weatherState.error">
        <p>{{ weatherState.error }}</p>
        <button class="retry-btn" (click)="loadWeather()">Retry</button>
      </div>
    </div>
  `,
  styleUrls: ['./weather-widget.css']
})
export class WeatherWidgetComponent implements OnInit {
  protected Math = Math;
  
  weatherState: WeatherState = {
    data: null,
    loading: false,
    error: null
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherState = { data: null, loading: true, error: null };
    
    this.weatherService.getCurrentWeather('London').subscribe({
      next: (data) => {
        if (data) {
          this.weatherState = { data, loading: false, error: null };
        } else {
          this.weatherState = { 
            data: null, 
            loading: false, 
            error: 'Failed to load weather data. Please try again.' 
          };
        }
      },
      error: (error) => {
        this.weatherState = { 
          data: null, 
          loading: false, 
          error: 'Failed to load weather data. Please check your connection and try again.' 
        };
      }
    });
  }
}