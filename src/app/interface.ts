// Geocoding
export interface Location {
  name: string;
  lat: number;
  lon: number;
}

// City Weather Data
export interface WeatherData {
  weather: Weather[];
  main: Main;
  name: string;
  id:number;
}

export interface Main {
  temp: number;
}

export interface Weather {
  description: string;
  icon: string;
}
