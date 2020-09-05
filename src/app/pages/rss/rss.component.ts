import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApixuService } from '../../services/apixu.service';
import { BehaviorSubject, interval, never } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import * as xml2js from 'xml2js';
import { ɵDomSanitizerImpl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.scss']
})
export class RssComponent implements OnInit {
  rssFeed: any;
  imagen = '';
  contador = 0;
  esPrimero = true;
  esUltimo = false;
  climaActual: any;
  playingNotificacion = new BehaviorSubject(false);
  playingTimer = new BehaviorSubject(false);
  //delay = 3600000;
  delayNotificacion = 15000;
  delayTimer = 3600000;
  

  constructor(
    private apixuService: ApixuService) { }

  ngOnInit() {

  
   this.subscribirTimer();
   this.playingTimer.next(true);
  }


  cargarRss() {
    let rss;
    try {
      this.apixuService.getRss()
      .subscribe(resp => {
          xml2js.parseString( resp, function (err, result) {
            console.dir(result);
            rss = result.rss.channel[0].item;
          });
          this.rssFeed = rss;
          console.log(this.rssFeed);
       
  });
    } catch (error) {
    }

    return rss;
  }


  subscribirTimer() {
    const observable = this.playingTimer.pipe(
     switchMap(e => !!e ? interval(this.delayTimer).pipe(startWith('start')) : never()));
    observable.subscribe(e => {
      console.log('actualizando timer');
      this.rssFeed =  this.cargarRss();
      this.subscribirRss();
      this.playingNotificacion.next(true);
    });
  }


  
  subscribirRss() {    
    const observable = this.playingNotificacion.pipe(
     switchMap(e => !!e ? interval(this.delayNotificacion).pipe(startWith('start')) : never()));
    observable.subscribe(e => {
      console.log('actualizando notificacion');
      if(this.rssFeed) {
        if((this.rssFeed.length > this.contador) && (this.contador > 0)) {
          this.contador++;
          console.log(this.contador);
        }
        if (this.rssFeed.length === this.contador) {
          this.contador = 0;
          console.log(this.contador);
        }
        if (( this.contador === 0) && (this.esPrimero)) {
          this.esPrimero = false;
          console.log(this.contador);
        }
  
        if (( this.contador === 0) && (!this.esPrimero)) {
          this.contador++;
          console.log(this.contador);
        }
      }
 

    });
  }

}
