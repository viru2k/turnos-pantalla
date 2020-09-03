import { Component, OnInit, ViewChild } from '@angular/core';
import { MultimediaService } from '../../../services/multimedia.service';
import { MultimediaArchivo } from './../../../models/multimedia-archivo.model';
import { URL_ARCHIVO } from './../../../config/config';
import { BehaviorSubject, interval, never } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { SocketService } from './../../../services/socket.service';

@Component({
  selector: 'app-reproductior-multimedia',
  templateUrl: './reproductior-multimedia.component.html',
  styleUrls: ['./reproductior-multimedia.component.scss']
})
export class ReproductiorMultimediaComponent implements OnInit {

  images: MultimediaArchivo[] = [];
  time = new Date();
  archivoNumero = 0;
  limiteArchivo = 0;
  archivo = '';
  archivo_tipo = false;
  esPrimeraVez = true;
  esUltimo = false;
  delay = 5000;
  playPromise;

  playing = new BehaviorSubject(false);
  @ViewChild('videoPlayer', { static: false }) videoplayer: any;

  constructor(
    private socketService: SocketService,
    private multimediaService: MultimediaService) { }


  ngOnInit() {

    this.socketService.listen('datos')
    .subscribe((data: any) => {
      console.log(data);
      if (data === 'reiniciar-multimedia') {
          console.log(data);
          this.getArchivos();
          // evaluo si hay nuevo cliente
      }
    });


    this.subscribirTimer();
    this.getArchivos();
  }

  subscribirTimer() {
       const observable = this.playing.pipe(
        switchMap(e => !!e ? interval(this.delay).pipe(startWith('start')) : never()));
       observable.subscribe(e => {

       // si es el ultimo seteo primera vez a verdadero y contador a 0
       if ((this.archivoNumero ) === (this.limiteArchivo - 1)) {
     //   console.log('-----------ULTIMO ELEMENTO--------------');
     //   console.log(' elemento ' + this.archivoNumero + ' de ' + (this.limiteArchivo - 1) );
        if (this.images[this.archivoNumero].es_video) {
            console.log('ES VIDEO');
            this.esUltimo = true;
            this.iniciarVideo();
          } else {
            console.log('elemento menor  al largo ' + this.archivoNumero );
            this.archivoNumero = 0;
            this.esPrimeraVez = true;
            this.esUltimo = false; // reinicio
          }

      }

       if ( (!this.esPrimeraVez)) {
          //    console.log('-----------ELEMENTO DE LA PILA--------------');
          //    console.log(' elemento ' + this.archivoNumero + ' de ' + (this.limiteArchivo - 1) );
              if (this.images[this.archivoNumero].es_video) {
                console.log('ES VIDEO');
                this.iniciarVideo();
              } else {
                this.archivoNumero ++;
              }
            } else {
              this.esPrimeraVez = false;
            }
        });



  }



  getArchivos() {

    try {
      this.multimediaService.getMultimedia()
      .subscribe(resp => {
      if (resp[0]) {
        this.archivoNumero = 0;
        this.archivo = '';
        resp.forEach(element => {
          // tslint:disable-next-line: max-line-length
          this.images.push(new MultimediaArchivo(element.id, URL_ARCHIVO + element.archivo_nombre, element.archivo_nombre_original, element.archivo_descripcion, element.orden, element.fecha_carga, element.fecha_vencimiento, element.tiene_vencimiento, this.obtenerExtension(element)));
        });
        this.limiteArchivo = this.images.length;
        console.log('subscribiendo');
        this.archivo = this.images[this.archivoNumero].archivo_nombre;
        console.log(this.images);
        this.playing.next(true);
      }

      },
      error => {
          console.log(error.message);
          console.log(error.status);
       });
  } catch (error) {

  }
  }

  iniciarVideo() {
  //  console.log('reproducioendo ' + this.images[this.archivoNumero].archivo_nombre);
   // console.log(this.images[this.archivoNumero]);
    this.playing.next(false);
    this.videoplayer.nativeElement.src = this.images[this.archivoNumero].archivo_nombre;
    this.videoplayer.nativeElement.load();
    this.videoplayer.nativeElement.volume = 0;
   
    this.playPromise =  this.videoplayer.nativeElement.play();
    if (this.playPromise !== undefined) {
      this.playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  }

  cambiarVideo() {
  //  console.log('video finalizado');
    if (this.playPromise !== undefined) {
      this.playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
        this.videoplayer.nativeElement.stop();
      })
      .catch(error => {
     //   console.log(error);
        // Auto-play was prevented
        // Show paused UI.
      });
    }
    if (this.esUltimo) {
      this.archivoNumero = 0;
      this.esPrimeraVez = true;
      this.esUltimo = false;
    } else {
      this.archivoNumero ++;
    }

    this.playing.next(true);

}



  obtenerExtension(element: MultimediaArchivo) {

    const ext = element.archivo_nombre.substr(element.archivo_nombre.lastIndexOf('.') + 1);
   // console.log(ext);
    if ((ext === 'jpg') || (ext === 'png') || (ext === 'PNG') || (ext === 'jpeg') ) {
      return false;
    } else {
      return true;
    }
  }
}
