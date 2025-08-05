import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherData } from './weather.models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // TODO: Replace with actual API key from environment configuration
  private readonly API_KEY = 'YOUR_OPENWEATHER_API_KEY_HERE';
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string = 'London'): Observable<WeatherData | null> {
    // For demo purposes, return mock data since we don't have a real API key
    // To use the real API, get an API key from https://openweathermap.org/api
    // and replace 'YOUR_OPENWEATHER_API_KEY_HERE' above with your actual key
    
    const mockWeatherData: WeatherData = {
      main: {
        temp: 22.5,
        feels_like: 24.1,
        humidity: 65
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }],
      name: city,
      sys: {
        country: 'GB'
      }
    };

    return of(mockWeatherData);

    // Real API implementation (uncomment when you have a valid API key):
    /*
    if (this.API_KEY === 'YOUR_OPENWEATHER_API_KEY_HERE') {
      console.warn('Weather API: Using mock data. Please configure a real OpenWeather API key.');
      return of(mockWeatherData);
    }

    const url = `${this.BASE_URL}?q=${city}&appid=${this.API_KEY}&units=metric`;
    return this.http.get<WeatherData>(url).pipe(
      catchError(error => {
        console.error('Weather API Error:', error);
        return of(null);
      })
    );
    */
  }
}