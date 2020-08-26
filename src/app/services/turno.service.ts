import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {  PARAMS } from '../config/config';
import { User } from '../models/user.model';
import { UsuarioModulo } from '../models/user-modulo.model';
import { URL_SERVICIOS } from './../config/config';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private url: string;

  constructor(public http: HttpClient) {
    this.url = URL_SERVICIOS;
  }

  getProximoNumero(id: number) {
  return this.http.get<any[]>(this.url + 'turnos/llamar/proximo?sector_usuario_id=' + id);
  }

  Llamar(sector_usuario_id: string) {
    return this.http.get<any[]>(this.url + 'turnos/llamar/llamar?sector_usuario_id=' + sector_usuario_id);
    }

  llamarNumeroSeleccionado(sector_usuario_id: string, numero_id: string) {
    return this.http.get<any[]>(this.url + 'turnos/llamar/llamar/seleccionado?sector_usuario_id=' + sector_usuario_id+ '&numero_id='+ numero_id);
    }


  LlamarRepetir(sector_usuario_id: string, numero_id: string) {
    return this.http.get<any[]>(this.url + 'turnos/llamar/llamar/repetir?sector_usuario_id=' + sector_usuario_id + '&numero_id=' + numero_id);
}

  getListadoPantalla() {
    return this.http.get<any[]>(this.url + 'turnos/llamar/pantalla');
    }

    getListadoSectorCondicion(estado: string, consulta: string, usuarioId: string, sectorId: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any[]>(this.url + 'turnos/consulta/condicion/estado?estado=' + estado + '&consulta=' + consulta + '&usuario_id=' + usuarioId + '&sector_id=' + sectorId);
    }


/* -------------------------------------------------------------------------- */
/*                  CONFIGURACION DE PUESTO, SECTOR Y USUARIO                 */
/* -------------------------------------------------------------------------- */
  
  getSectorByUsuario(usuario_id: string) {
    return this.http.get<any[]>(this.url + 'turnos/usuario/sector?usuario_id=' + usuario_id );
    }

  setUsuarioSector(puesto_nombre: string, sector_id: string, usuario_id: string) {
    return this.http.get<any>(this.url + 'mantenimiento/sector/usuario/nuevo?usuario_id='+ usuario_id +'&sector_id='+sector_id +'&puesto_nombre='+ puesto_nombre);
  }

  putUsuarioSector(id: string, usuario: any) {
    return this.http.put<any>(this.url + 'mantenimiento/sector/usuario/' + id, usuario);
  }


  
  getSector() {
    return this.http.get<any[]>(this.url + 'mantenimiento/sector');
    }

  setSector(usuario: any) {
    return this.http.post<any>(this.url + 'mantenimiento/sector', usuario);
  }

  putSector(id: string, usuario: any) {
    return this.http.put<any>(this.url + 'mantenimiento/sector/' + id, usuario);
  }


  getPuesto() {
    return this.http.get<any[]>(this.url + 'mantenimiento/puesto');
    }

  setPuesto(usuario: any) {
    return this.http.post<any>(this.url + 'mantenimiento/puesto', usuario);
  }

  putPuesto(id: string, usuario: any) {
    return this.http.put<any>(this.url + 'mantenimiento/puesto/' + id, usuario);
  }


  getLlamando() {
    return this.http.get<any[]>(this.url + 'turnos/pantalla/llamando' );
    }

}
