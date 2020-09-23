import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SortColumns } from './directivas/sortcolumns';

import { LocalizacionesComponent } from './localizaciones/localizaciones.component';
import { LocalizacionFormComponent } from './localizaciones/localizacion-form/localizacion-form.component';
import { LocalizacionListComponent } from './localizaciones/localizacion-list/localizacion-list.component';
import { LocalizacionService } from './servicios/localizacion.service';

import { ProductosComponent } from './productos/productos.component';
import { ProductoFormComponent } from './productos/producto-form/producto-form.component';
import { ProductoListComponent } from './productos/producto-list/producto-list.component';
import { ProductoService } from './servicios/producto.service';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertaFormComponent } from './ofertas/oferta-form/oferta-form.component';
import { OfertaListComponent } from './ofertas/oferta-list/oferta-list.component';
import { OfertaService } from './servicios/oferta.service';




import { ChatsComponent } from './chats/chats.component';
import { ChatFormComponent } from './chats/chat-form/chat-form.component';
import { ChatListComponent } from './chats/chat-list/chat-list.component';
import { ChatService } from './servicios/chat.service';


import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SortColumns,
    LocalizacionesComponent,
    LocalizacionFormComponent,
    LocalizacionListComponent,
    ProductosComponent,
    ProductoFormComponent,
    ProductoListComponent,
    
    LocalizacionesComponent,
    LocalizacionFormComponent,
    LocalizacionListComponent,

    OfertasComponent,
    OfertaFormComponent,
    OfertaListComponent,
    ChatsComponent,
    ChatFormComponent,
    ChatListComponent,

    LoginComponent,
    RegistrarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
  LocalizacionService,
  ProductoService,
  ChatService,
  OfertaService,
  AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
