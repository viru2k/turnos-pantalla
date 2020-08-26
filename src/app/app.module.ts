import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ROUTES } from './app.routes';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component'; 
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PacienteService } from './services/paciente.service';
import { HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';
import {   LOCALE_ID, Injector} from '@angular/core';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {config } from './config/config';
import { ReproductiorMultimediaComponent } from './pages/multimedia/reproductior-multimedia/reproductior-multimedia.component';
import {GalleriaModule} from 'primeng/galleria';
 import { ApixuService } from './services/apixu.service';
import { ClimaComponent } from './pages/clima/clima.component';

@NgModule({
  declarations: [
    LoadingComponent,
    AppComponent,
    PrincipalComponent,
    ClimaComponent,
    EmptyComponent,
    NotFoundComponent,
    ReproductiorMultimediaComponent
  ],
  imports: [ FormsModule ,
 
  HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    GalleriaModule,
    SweetAlert2Module.forRoot(),

    SocketIoModule.forRoot(config),
    RouterModule.forRoot( ROUTES, { useHash: true } ),
  ],
  providers: [ApixuService,
 // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
 {
  provide: HTTP_INTERCEPTORS,
  useFactory: function(injector: Injector) {
      return new JwtInterceptor(injector);
  },
  multi: true,
  deps: [Injector]
},
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
