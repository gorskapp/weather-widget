import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private hostURL = "http://api.openweathermap.org";
  private appid = "1f403fbc936b16f11e331c6245d679ac";

  // endpoints
  geocoding = "/geo/1.0/direct";
  currentWeather = "/data/2.5/weather";

  units = "metric";
  lang = "en";

  constructor(private http: HttpClient) { }

  getLocationsCoodrinates(name: string): Observable<Location> {
    const httpOptions = {
      params: new HttpParams()
      .set('q', name)
      .set('appid', this.appid)
    };
    return this.http.get<Location>(this.hostURL + this.geocoding, httpOptions);
  }

  getCurrentWeather(lat: number, lon: number): Observable<WeatherData> {
    const httpOptions = {
      params: new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.appid)
      .set('units', this.units)
      .set('lang', this.lang)
    };
    return this.http.get<WeatherData>(this.hostURL + this.currentWeather, httpOptions);
  }
}
