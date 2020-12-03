import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { CategoriaProductosComponent } from './categoriaProductos/categoriaProductos.component';
import { CategoriaProductoFormComponent } from './categoriaProductos/categoriaProducto-form/categoriaProducto-form.component';
import { CategoriaProductoListComponent } from './categoriaProductos/categoriaProducto-list/categoriaProducto-list.component';
import { CategoriaProductoService } from './servicios/categoriaProducto.service';

import { TransportadoresComponent } from './transportadores/transportadores.component';
import { TransportadorFormComponent } from './transportadores/transportador-form/transportador-form.component';
import { TransportadorListComponent } from './transportadores/transportador-list/transportador-list.component';
import { TransportadorService } from './servicios/transportador.service';

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
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteListComponent} from './clientes/cliente-list/cliente-list.component';
import { ClienteService } from './servicios/cliente.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuarioService } from './servicios/usuario.service';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { VendedorFormComponent } from './vendedores/vendedor-form/vendedor-form.component';
import { VendedorListComponent } from './vendedores/vendedor-list/vendedor-list.component';
import { VendedorService } from './servicios/vendedor.service';
import { FotosComponent } from './fotos/fotos.component';
import { FotoFormComponent } from './fotos/foto-form/foto-form.component';
import { FotoListComponent } from './fotos/foto-list/foto-list.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FacturaFormComponent } from './facturas/factura-form/factura-form.component';
import { FacturaListComponent } from './facturas/factura-list/factura-list.component';
import  { FacturaService } from './servicios/factura.service';
import { PedidoListComponent } from './pedidos/pedido-list/pedido-list.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoFormComponent } from './pedidos/pedido-form/pedido-form.component';
import { PedidoService } from './servicios/pedido.service';
import { RolesComponent } from './roles/roles.component';
import { RolFormComponent } from './roles/rol-form/rol-form.component';
import { RolListComponent } from './roles/rol-list/rol-list.component';
import { RolService } from './servicios/rol.service';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MensajeFormComponent } from './mensajes/mensaje-form/mensaje-form.component';
import { MensajeListComponent } from './mensajes/mensaje-list/mensaje-list.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { CalificacionFormComponent } from './calificaciones/calificacion-form/calificacion-form.component';
import { CalificacionListComponent } from './calificaciones/calificacion-list/calificacion-list.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { DireccionFormComponent } from './direcciones/direccion-form/direccion-form.component';
import { DireccionListComponent } from './direcciones/direccion-list/direccion-list.component';
import { FotoService } from './servicios/foto.service';
import { RepartidorPedidoComponent } from './repartidor-pedido/repartidor-pedido.component';
import { VistaComponent } from './repartidor-pedido/vista/vista.component';
import { ClientePedidoComponent } from './cliente-pedido/cliente-pedido.component';
import { VendedorPedidoComponent } from './vendedor-pedido/vendedor-pedido.component';
import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { ModalsComponent } from './modals/modals.component';
import { VistaVPComponent } from './vendedor-pedido/vista-vp/vista-vp.component';
import { RegistroVendedorComponent } from './registro-vendedor/registro-vendedor.component';
import { PerfilVendedorComponent } from './perfil-vendedor/perfil-vendedor.component';
import { PerfilVendedorListComponent } from './perfil-vendedor/perfil-vendedor-list/perfil-vendedor-list.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { PerfilClienteListComponent } from './perfil-cliente/perfil-cliente-list/perfil-cliente-list.component';
import { RegistroTransportadorComponent } from './registro-transportador/registro-transportador.component';
import { PerfilTransportadorComponent } from './perfil-transportador/perfil-transportador.component';
import { PerfilTransportadorListComponent } from './perfil-transportador/perfil-transportador-list/perfil-transportador-list.component';
import { VistaCPComponent } from './cliente-pedido/vista-cp/vista-cp.component';
import { RepartidorpedidosComponent } from './repartidorpedidos/repartidorpedidos.component';
import { ListaPreparacionComponent } from './lista-preparacion/lista-preparacion.component';
import { ListaPreparacionListComponent } from './lista-preparacion/lista-preparacion-list/lista-preparacion-list.component';
import { PedidosClientComponent } from './pedidos-client/pedidos-client.component';

import { PedidosclienteFormComponent } from './pedidos-client/pedidoscliente-form/pedidoscliente-form.component';
import { DireccionClienteComponent } from './registro-cliente/direccion-cliente/direccion-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    SortColumns,
    ClientesComponent,
    ClienteFormComponent,
    ClienteListComponent,
    LocalizacionesComponent,
    LocalizacionFormComponent,
    LocalizacionListComponent,
    ProductosComponent,
    ProductoFormComponent,
    ProductoListComponent,
    CategoriaProductosComponent,
    CategoriaProductoFormComponent,
    CategoriaProductoListComponent,

    TransportadoresComponent,
    TransportadorFormComponent,
    TransportadorListComponent,
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
    DetalleFacturaListComponent,
    UsuariosComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
    VendedoresComponent,
    VendedorFormComponent,
    VendedorListComponent,
    FotosComponent,
    FotoFormComponent,
    FotoListComponent,
   
    RolesComponent,
    RolFormComponent,
    RolListComponent,
    MensajesComponent,
    MensajeFormComponent,
    MensajeListComponent,
    CalificacionesComponent,
    CalificacionFormComponent,
    CalificacionListComponent,
    DireccionesComponent,
    DireccionFormComponent,
    DireccionListComponent,
    
    FacturaListComponent,
    FacturasComponent,
    FacturaFormComponent,
    PedidoListComponent,
    PedidosComponent,
    PedidoFormComponent,
    RepartidorPedidoComponent,
    VistaComponent,
    ClientePedidoComponent,
    VendedorPedidoComponent,
    ProductosVendedorComponent,
    MapBoxComponent,
    ModalsComponent,
    VistaVPComponent,
    RegistroVendedorComponent,
    PerfilVendedorComponent,
    PerfilVendedorListComponent,
    RegistroClienteComponent,
    PerfilClienteComponent,
    PerfilClienteListComponent,
    RegistroTransportadorComponent,
    PerfilTransportadorComponent,
    PerfilTransportadorListComponent,
    VistaCPComponent,
    RepartidorpedidosComponent,
    ListaPreparacionComponent,
    ListaPreparacionListComponent,
    PedidosClientComponent,
  
    PedidosclienteFormComponent,
    DireccionClienteComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
  LocalizacionService,
  VendedorService,
  UsuarioService,
  ProductoService,
  ChatService,
  ClienteService,
  OfertaService,
  RolService,
  RubroService,
  DetalleFacturaService,
  DetallePedidoService,
  CategoriaProductoService,
  TransportadorService,
  FacturaService,
  FotoService,
  PedidoService,
  AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
