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
import { RubrosComponent } from './rubros/rubros.component';
import { RubroFormComponent } from './rubros/rubro-form/rubro-form.component';
import { RubroListComponent } from './rubros/rubro-list/rubro-list.component';
import { DetallePedidosComponent } from './detalle-pedidos/detalle-pedidos.component';
import { DetallePedidoFormComponent } from './detalle-pedidos/detalle-pedido-form/detalle-pedido-form.component';
import { DetallePedidoListComponent } from './detalle-pedidos/detalle-pedido-list/detalle-pedido-list.component';
import { DetalleFacturasComponent } from './detalle-facturas/detalle-facturas.component';
import { DetalleFacturaFormComponent } from './detalle-facturas/detalle-factura-form/detalle-factura-form.component';
import { DetalleFacturaListComponent } from './detalle-facturas/detalle-factura-list/detalle-factura-list.component';
import { RubroService } from './servicios/rubro.service';
import { DetalleFacturaService } from './servicios/detalle-factura.service';
import { DetallePedidoService } from './servicios/detalle-pedido.service';

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
    InicioComponent,
    RubrosComponent,
    RubroFormComponent,
    RubroListComponent,
    DetallePedidosComponent,
    DetallePedidoFormComponent,
    DetallePedidoListComponent,
    DetalleFacturasComponent,
    DetalleFacturaFormComponent,
    DetalleFacturaListComponent
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
  RubroService,
  DetalleFacturaService,
  DetallePedidoService,
  AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
