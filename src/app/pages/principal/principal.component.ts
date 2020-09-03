import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { DocumentService } from './../../services/document-service.service';
import { TurnoService } from '../../services/turno.service';
import { Filter } from './../../shared/filter';
import { SocketService } from './../../services/socket.service';
declare const require: any;
declare var electron: any;
declare var ipc: any;
@Component({
  selector:  'app-principal',
  templateUrl:  './principal.component.html',
  styleUrls:  ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

 documento = '';
 loading: boolean;
 existe: boolean;
 elementos: any[] = null;
 elementosAtendidos: any[] = [];
 elementoLlamando: any = [];
 elementoTurno: any = null;
 elemento: any = null;
 elementoModulo: [] = null;
 user: User;
 username: string;
 loggedIn = false;
 imprimir = false;
 nuevo = false;
 horario: any;
 llamando: boolean;
 numeroLlamando: any;
 estado = 'CONECTANDO CON EL SERVIDOR';
 motivoTurno: string;
 time = new Date();
 textoLargo: boolean;
 largo: number;

  constructor(
    private socketService: SocketService,
    private authenticationService: AuthenticationService,
    private miServico: UserService,
    private turnoService: TurnoService,
    private filter: Filter) {

   }

  ngOnInit() {


    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.loggedIn = true;
    this.username = userData.username;


    this.getListadoPantalla();
    setTimeout(() => {
      this.llamando = false;
      console.log('tiempo finalizado');
    }, 18000);

    this.asignarModulos(userData.access_list);

    this.socketService.listen('datos')
    .subscribe((data: any) => {
      console.log(data);
      console.log(data);
      if (data === 'llamando-pantalla') {
        
       this.getListadoPantalla();
       console.log('mostrando numero llamando');
       this.llamando = true;
       this.playAudio();
       setTimeout(() => {
        this.llamando = false;
        console.log('tiempo finalizado');
    }, 5000);
       }

      if (data === 'llamando-recepcion') {
  /*      this.getListadoPantalla();
       console.log('mostrando numero llamando');
       this.llamando = true;
       this.playAudio();
       setTimeout(() => {
        this.llamando = false;
        console.log('tiempo finalizado');
    }, 5000);*/
       } 
    });



  } else {
    this.onSubmit();
  }
    this.onSubmit();
  }


  playAudio(){
    const audio = new Audio();
    audio.src = './assets/sound/60468doorbell.mp3';
    audio.load();
    audio.play();
  }


  agregarCaracter(numero: string){
    this.documento = this.documento + numero;
  }

  borrarCaracter(){
    this.documento = this.documento.substring(0, this.documento.length - 1);
  }

  onSubmit() {

    this.loading = true;
    this.estado = 'AUTENTICANDO APLICACION';
    this.authenticationService.login('admin','1234')
        .subscribe(
            data => {
              this.user = data;
              const us = new User('', '', '', '', '', 'admin', '1234', []);
              localStorage.setItem('userData', JSON.stringify(us));
              localStorage.setItem('currentUser', JSON.stringify(this.user));
              this.loadUser();
            },
            error => {
              this.loading = false;
            });
  }

loadUser() {

  this.loading = true;
  try {
    this.miServico.getItemInfoAndMenu('turnos')
      .subscribe(resp => {
      this.elemento = resp;
      const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      const userData = JSON.parse(localStorage.getItem('userData'));

      this.elementoModulo = <any>this.elemento;
      this.user = new User(this.elemento[0].id , this.elemento[0].email, this.elemento[0].nombreyapellido,
         this.elemento[0].name, '1', this.elemento[0].email, currentUser.access_token, this.elementoModulo);
      this.username = userData.username;
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(this.user));
      this.asignarModulos(this.elementoModulo);
       //  this.getTurnoPantallaLlamando();
       //  this.getTurnoPantallaAtendido();
      this.loading = false;

      this.loggedIn = true;
      },
      error => { // error path

          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
       });
  } catch (error) {

  }
  }

  asignarModulos(modulos: any) {
    modulos.forEach(element => {
     // //console.log(element['modulo_nombre']);
    });

  }




  getListadoPantalla() {


    try {
      this.turnoService.getListadoPantalla()
      .subscribe(resp => {
        console.log(resp);
        if (resp.length>0) {
          let llamandolimite = 0;
          let atendiendolimite = 0;
          this.elementosAtendidos = [];
          this.elementoLlamando = [];
          resp.forEach(element => {
              if ((element.estado === 'ATENDIDO') && (atendiendolimite < 4)) {
                element.numero = this.filter.padLeft(element.numero, '0', 3);
                this.elementosAtendidos.push(element);
                atendiendolimite++;
              }

              if ((element.estado === 'LLAMANDO') && (llamandolimite < 4)) {
                element.numero = this.filter.padLeft(element.numero, '0', 3);
                this.elementoLlamando.push(element);
                llamandolimite++;
              }
            });
       
          this.llamandoNumero();
        }
      },
      error => { // error path
          //console.log(error.message);
          //console.log(error.status);    
       });    
  } catch (error) {

  }  
  } 



  llamandoNumero() {

    try {
      this.turnoService.getLlamando()
      .subscribe(resp => {
        console.log(resp);
        if(resp.length>0){
          this.llamando = true;
          this.numeroLlamando = resp;
          this.numeroLlamando[0].numero = this.filter.padLeft(resp[0].numero, '0', 3);
        }else{
          this.existe= true;
          this.loading = false;
          this.estado = '';
          
        }
      },
      error => { 
          //console.log(error.message);
          //console.log(error.status);
       
       });    
  } catch (error) {
  
  }  
  }
  


  //VALIDO SI EL PACIENTE EXISTE
 



}

