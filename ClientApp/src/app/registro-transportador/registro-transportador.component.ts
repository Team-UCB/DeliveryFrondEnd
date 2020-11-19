import { Component, OnInit } from '@angular/core';
import { TransportadorService } from '../servicios/transportador.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { Transportador } from '../modelos/transportador.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-transportador',
  templateUrl: './registro-transportador.component.html',
  styles: [
  ]
})
export class RegistroTransportadorComponent implements OnInit {

  registerUserData: Usuario;
  registroTransportadorData: Transportador;
  LastTransportador: Transportador;

  constructor(private userService: UsuarioService, private transportadorService: TransportadorService, 
              private toastr: ToastrService, public router: Router) 
              { 
                this.registerUserData = new Usuario();
                this.registroTransportadorData = new Transportador();
                this.LastTransportador = new Transportador();
              }

  ngOnInit(): void {
  }

  registerDataTransportador(): void{
    this.transportadorService.formData = this.registroTransportadorData;
    this.transportadorService.postTransportador().subscribe(
      res => {
        this.LastTransportador = (res as any) as Transportador;
        console.log(this.LastTransportador.Id);
        this.registerDataUser(this.LastTransportador.Id);
        this.onLogin();
      },
      err => { console.log(err); }
    );
  }

  // REGISTRO USUARIO

  registerDataUser(idTransportador){
    console.log(idTransportador);

    this.registerUserData.Entidad = 'Transportador';
    this.registerUserData.IdRef = idTransportador;
    this.registerUserData.IdRol = 4;
    this.registerUserData.Estado = 'activo';
    console.log(this.registroTransportadorData);
    this.userService.formData = this.registerUserData;
    this.userService.postUsuario().subscribe(
      res => {
        console.log(res);
        this.toastr.info('Datos guardados', 'Su usuario fue creado correctamente');
      },
      err => {console.log(err);
      }
    );
  }

  onLogin(): void{
    this.router.navigate(['/ingresar']);
  }

}
