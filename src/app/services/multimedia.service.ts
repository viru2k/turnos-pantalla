import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  constructor(public http: HttpClient) { }

  getMultimedia(){
    return this.http.get<any[]>(URL_SERVICIOS + 'multimedia/ordenado');
    }
}
