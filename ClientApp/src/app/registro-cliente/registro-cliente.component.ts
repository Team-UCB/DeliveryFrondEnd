import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../servicios/cliente.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { Cliente } from '../modelos/cliente.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styles: [
  ]
})
export class RegistroClienteComponent implements OnInit {
  registerUserData: Usuario;
  registerClientData: Cliente;
  LastClient: Cliente;

  constructor(private userService: UsuarioService, private clientService: ClienteService,
              private toastr: ToastrService,public router: Router) 
  {
    this.registerUserData = new Usuario();
    this.registerClientData = new Cliente();
    this.LastClient = new Cliente();
  }

  ngOnInit(): void {

  }
  registerDataClient(): void{
    //registrar cliente
    this.clientService.formData = this.registerClientData;
    this.clientService.postCliente().subscribe(
      res => {
        this.LastClient = (res as any) as Cliente;
        console.log(this.LastClient.Id);
        this.registerDataUser(this.LastClient.Id);
        this.onLogin();
      },
      err => { console.log(err); }
    );
  }
  registerDataUser(idCliente){
    console.log(idCliente);
    //registrar usuario
    this.registerUserData.Entidad = "cliente";
    this.registerUserData.IdRef = idCliente;
    this.registerUserData.IdRol = 2;
    this.registerUserData.Estado = "activo";
    console.log(this.registerClientData);
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
