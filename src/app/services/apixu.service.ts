import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) {}
// SE AGREGO LA RUTA CORS ANYWHERE HEROKU
  getWeather(){
    // mendoza
    return this.http.get<any[]>('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=mendoza,%20argentina&appid=e0812e75f9ced8afb4c67cea2af16cd6&units=metric&lang=es');
    // san juan
    //return this.http.get<any[]>('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=San%20juan,%20argentina&appid=e0812e75f9ced8afb4c67cea2af16cd6&units=metric&lang=es');

  }
}


//Request URL: http://api.weatherstack.com/current?access_key=1b4385df574706085b602d8216c4eb65&query=New%20York
