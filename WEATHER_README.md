# Weather Widget Configuration

## Overview
The weather widget displays current weather information using the OpenWeather API. Currently configured with mock data for demonstration purposes.

## Setting up the OpenWeather API

### 1. Get an API Key
1. Visit [OpenWeather API](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section in your account
4. Generate a new API key

### 2. Configure the API Key
1. Open `src/app/weather.service.ts`
2. Replace `'YOUR_OPENWEATHER_API_KEY_HERE'` with your actual API key
3. Uncomment the real API implementation code block
4. Comment out or remove the mock data return statement

### 3. Example Configuration

```typescript
// Replace this line:
private readonly API_KEY = 'YOUR_OPENWEATHER_API_KEY_HERE';

// With your actual API key:
private readonly API_KEY = 'your-actual-api-key-here';

// Then uncomment the real API implementation block
```

## Features

- **Current Weather Display**: Shows temperature, description, feels-like temperature, and humidity
- **Loading States**: Displays loading spinner while fetching data
- **Error Handling**: Shows error message with retry button when API calls fail
- **Responsive Design**: Adapts to different screen sizes
- **Mock Data**: Works out of the box with demo data for development

## Customization

### Changing the Default City
Modify the default city parameter in the service call:

```typescript
this.weatherService.getCurrentWeather('Your-City-Name').subscribe(...)
```

### Styling
The weather widget can be styled by modifying `src/app/weather-widget/weather-widget.css`. The component uses CSS custom properties for consistent theming with the rest of the application.