import { Component, OnInit } from '@angular/core';
import { ApixuService } from '../../services/apixu.service';
import { BehaviorSubject, interval, never } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss']
})
export class ClimaComponent implements OnInit {
  imagen = '';
  climaActual: any;
  playing = new BehaviorSubject(false);
  delay = 3600000;

  constructor(private apixuService: ApixuService) { }

  ngOnInit() {

    this.subscribirTimer();
    this.playing.next(true);
    
  }

  


  subscribirTimer() {
    const observable = this.playing.pipe(
     switchMap(e => !!e ? interval(this.delay).pipe(startWith('start')) : never()));
    observable.subscribe(e => {this.apixuService.getWeather()
      .subscribe(resp => {
        if (resp) {
          console.log('actualizando clima');
          console.log(resp);
          this.imagen = "http://openweathermap.org/img/w/" + resp['weather'][0].icon + ".png";
          this.climaActual = resp;
        //  console.log(this.climaActual);
        //this.playing.next(true);
        }
  
  
      },
      error => {
      //    console.log(error.message);
       //   console.log(error.status);
          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
        //  this.loading_mensaje = '';
  
       });
     });



}

}
