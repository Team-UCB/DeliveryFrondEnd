import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesComponent} from './localizaciones/localizaciones.component';
import { VendedoresComponent} from './vendedores/vendedores.component';
import { UsuariosComponent} from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { OfertasComponent} from './ofertas/ofertas.component';
//import { pedidosComponent} from './pedidos/pedidos.component';
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
const routes: Routes = [
  {path:"localizaciones", component: LocalizacionesComponent, canActivate: [AuthGuard]},
  {path:"vendedores", component: VendedoresComponent, canActivate: [AuthGuard]},
  {path:"usuarios", component: UsuariosComponent, canActivate: [AuthGuard]},
  {path:"productos", component: ProductosComponent, canActivate: [AuthGuard]},
  {path:"ofertas", component: OfertasComponent, canActivate: [AuthGuard]},
  {path:"roles", component: RolesComponent, canActivate: [AuthGuard]},
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
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
