import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesComponent} from './localizaciones/localizaciones.component';
import { VendedoresComponent} from './vendedores/vendedores.component';
import { UsuariosComponent} from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { OfertasComponent} from './ofertas/ofertas.component';
import { FacturasComponent} from './facturas/facturas.component';
import { ChatsComponent} from './chats/chats.component';
import { ClientesComponent} from './clientes/clientes.component';
import { RubrosComponent} from './rubros/rubros.component';
import { LoginComponent } from './login/login.component';
import { CategoriaProductosComponent} from './categoriaProductos/categoriaProductos.component';
import { TransportadoresComponent} from './transportadores/transportadores.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { RolesComponent } from './roles/roles.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { DetalleFacturasComponent } from './detalle-facturas/detalle-facturas.component';
import { DetallePedidosComponent } from './detalle-pedidos/detalle-pedidos.component';
import { FotosComponent } from './fotos/fotos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';
import { RepartidorPedidoComponent } from './repartidor-pedido/repartidor-pedido.component';
import { ClientePedidoComponent } from './cliente-pedido/cliente-pedido.component';
import { VendedorPedidoComponent } from './vendedor-pedido/vendedor-pedido.component';
import {MapBoxComponent} from './map-box/map-box.component';
import { ModalsComponent } from './modals/modals.component';
import { RegistroVendedorComponent } from './registro-vendedor/registro-vendedor.component';
import { PerfilVendedorComponent } from './perfil-vendedor/perfil-vendedor.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { RegistroTransportadorComponent } from './registro-transportador/registro-transportador.component';
import { PerfilTransportadorComponent } from './perfil-transportador/perfil-transportador.component';
import { RepartidorpedidosComponent } from './repartidorpedidos/repartidorpedidos.component';
import {ListaPreparacionComponent} from './lista-preparacion/lista-preparacion.component';
import { from } from 'rxjs';


const routes: Routes = [
  {path:"localizaciones", component: LocalizacionesComponent, canActivate: [AuthGuard]},
  {path:"vendedores", component: VendedoresComponent, canActivate: [AuthGuard]},
  {path:"usuarios", component: UsuariosComponent, canActivate: [AuthGuard]},
  {path:"productos", component: ProductosComponent, canActivate: [AuthGuard]},
  {path:"ofertas", component: OfertasComponent, canActivate: [AuthGuard]},
  {path:"roles", component: RolesComponent, canActivate: [AuthGuard]},
  {path:"VENDEDORESPRODUCTOS", component: ProductosVendedorComponent, canActivate: [AuthGuard]},
  {path:"repartidor-pedido", component: RepartidorPedidoComponent, canActivate: [AuthGuard]},
  {path:"cliente-pedido", component: ClientePedidoComponent, canActivate: [AuthGuard]},
  {path:"vendedor-pedido", component: VendedorPedidoComponent, canActivate: [AuthGuard]},
  {path:"map-box", component: MapBoxComponent, canActivate: [AuthGuard]},
  {path:"modals", component: ModalsComponent, canActivate: [AuthGuard]},
  {path: "lista-preparacion", component: ListaPreparacionComponent, canActivate: [AuthGuard]},

  {path:"repartidorPedido",component: RepartidorpedidosComponent, canActivate: [AuthGuard]},
  {path:"chats", component: ChatsComponent, canActivate: [AuthGuard]},
  {path:"clientes", component: ClientesComponent, canActivate: [AuthGuard]},
  {path:"rubros", component: RubrosComponent, canActivate: [AuthGuard]},
  {path:"detalle-facturas", component: DetalleFacturasComponent, canActivate: [AuthGuard]},
  {path:"detalle-pedidos", component: DetallePedidosComponent, canActivate: [AuthGuard]},
  {path:"facturas", component: FacturasComponent, canActivate: [AuthGuard]},
  {path:"pedidos", component: PedidosComponent, canActivate: [AuthGuard]},
  {path:"categoriaProductos", component: CategoriaProductosComponent, canActivate: [AuthGuard]},
  {path:"transportadores", component: TransportadoresComponent, canActivate: [AuthGuard]},
  {path:"fotos", component: FotosComponent, canActivate: [AuthGuard]},
  {path:"mensajes", component: MensajesComponent, canActivate: [AuthGuard]},
  {path:"calificaciones", component: CalificacionesComponent, canActivate: [AuthGuard]},
  {path:"direcciones", component: DireccionesComponent, canActivate: [AuthGuard]},
  {path:"ingresar", component: LoginComponent},
  {path:"registrar", component: RegistrarComponent},
  {path:"inicio", component: InicioComponent},
  {path:"registro-vendedor", component: RegistroVendedorComponent},
  {path:"perfil-vendedor", component: PerfilVendedorComponent},
  {path:"registro-cliente", component: RegistroClienteComponent},
  {path:"perfil-cliente", component: PerfilClienteComponent},
  {path:"registro-transportador", component: RegistroTransportadorComponent},
  {path:"perfil-transportador", component: PerfilTransportadorComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
