import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registerUserData: Usuario;
  constructor(private _usuarioSvr: UsuarioService, private _routes: Router) {
    this.registerUserData = new Usuario();
  }
  ngOnInit(): void {
   }
  registerUser(): void{
    console.log(this.registerUserData);
    this._usuarioSvr.formData = this.registerUserData;
    this._usuarioSvr.postUsuario().subscribe(
      res => {
      console.log(res);
      this._routes.navigate(['/']);
    },
    err => {
      console.log(err); }
    );
  }
}
