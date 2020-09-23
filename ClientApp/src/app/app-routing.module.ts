import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesComponent} from './localizaciones/localizaciones.component';
import { ProductosComponent } from './productos/productos.component';
import { OfertasComponent} from './ofertas/ofertas.component';
import { ChatsComponent} from './chats/chats.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path:"localizaciones", component: LocalizacionesComponent, canActivate: [AuthGuard]},
  {path:"productos", component: ProductosComponent, canActivate: [AuthGuard]},
  {path:"ofertas", component: OfertasComponent, canActivate: [AuthGuard]},
  {path:"chats", component: ChatsComponent, canActivate: [AuthGuard]},
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
