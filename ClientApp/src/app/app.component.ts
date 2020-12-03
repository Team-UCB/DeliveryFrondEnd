import { Component } from '@angular/core';
import { PedidoService } from './servicios/pedido.service';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  constructor(public _authService:UsuarioService, public service: PedidoService) {}
}
