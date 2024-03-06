import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { WeatherData } from '../interface';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  // API returns different names when calling for weather using lat and lon
  // Like Berlin = Alt-Kölln because their lat and lon are the same
  // that's why I created different arrays
  citiesForResponse: Array<string> = ['Łódź', 'Warsaw', 'Alt-Kölln', 'New York', 'London'];
  citiesForCalls: Array<string> = ['Lodz', 'Warszawa', 'Berlin', 'New York', 'London'];
  locationData!: Location;

  // for template usage
  weatherLodz!: WeatherData;
  weatherWarszawa!: WeatherData;
  weatherBerlin!: WeatherData;
  weatherNY!: WeatherData;
  weatherLondon!: WeatherData;

  selectedCities: Array<number> = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // select number from 0 to 4, use it as array index to select city
    // call for lat and lon for each selected
    let random = () => {
      do {
        const randomNumber = Math.floor(Math.random() * this.citiesForCalls.length);
        if (this.selectedCities.length === 0){
          this.selectedCities.push(randomNumber);
        }
        if (!(this.selectedCities.includes(randomNumber))) {
          this.selectedCities.push(randomNumber);
        }
      } while (this.selectedCities.length<3);

      this.getLocationCoordinatesAndWeather(this.citiesForCalls[this.selectedCities[0]]);
      this.getLocationCoordinatesAndWeather(this.citiesForCalls[this.selectedCities[1]]);
      this.getLocationCoordinatesAndWeather(this.citiesForCalls[this.selectedCities[2]]);
      this.selectedCities = [];
    }
    random();

    // reloding component to avoid leaving previously selected cities
    let refreshView = () => {
      location.reload();
    }

    // intervals of relod and random selection after 60 sec
    setInterval(refreshView, 60000)
    setInterval(random, 60000);
  }

  // get city lat and lon based on name
  getLocationCoordinatesAndWeather(name: string) {
    this.dataService.getLocationsCoodrinates(name). subscribe((response) => {
      this.locationData = response;
      const objToArray = Object.entries(this.locationData);
      const tempLocationDataArray = objToArray[0].slice(1);
      const lat = tempLocationDataArray[0].lat;
      const lon = tempLocationDataArray[0].lon;
      this.getWeather(lat, lon);
    })
  }

  // get current weather using lat and lon from function above
  getWeather(lat: number, lon: number) {
    this.dataService.getCurrentWeather(lat, lon).subscribe((response) => {
      const cityName = response.name;
      switch (cityName) {
        case this.citiesForResponse[0]:
          this.weatherLodz = response;
          break;
        case this.citiesForResponse[1]:
          this.weatherWarszawa = response;
          break;
        case this.citiesForResponse[2]:
          this.weatherBerlin = response;
          break;
        case this.citiesForResponse[3]:
          this.weatherNY= response;
          break;
        case this.citiesForResponse[4]:
          this.weatherLondon = response;
          break;

          default:
          console.log('not found');
      }
    })
  }

  // redirect to more detailed weather
  goToDetails(id:number) {
    window.open("https://openweathermap.org/city/" + id);
  }

}
