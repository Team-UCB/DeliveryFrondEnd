import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../servicios/vendedor.service';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { Vendedor } from '../modelos/vendedor.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-vendedor',
  templateUrl: './registro-vendedor.component.html',
  styles: [
  ]
})
export class RegistroVendedorComponent implements OnInit {

  registerUserData: Usuario;
  registroVendedorData: Vendedor;
  LastVendedor: Vendedor;

  constructor(private userService: UsuarioService, private vendedorService: VendedorService,
              private toastr: ToastrService, public router: Router) {
                this.registerUserData = new Usuario();
                this.registroVendedorData = new Vendedor();
                this.LastVendedor = new Vendedor();
              }

  ngOnInit(): void {
  }
  registerDataVendedor(): void{
    this.vendedorService.formData = this.registroVendedorData;
    this.vendedorService.postVendedor().subscribe(
      res => {
        this.LastVendedor = (res as any) as Vendedor;
        console.log(this.LastVendedor.Id);
        this.registerDataUser(this.LastVendedor.Id);
        this.onLogin();
      },
      err => { console.log(err); }
    );
  }

  // REGISTRO USUARIO

  registerDataUser(idVendedor){
    console.log(idVendedor);

    this.registerUserData.Entidad = 'Vendedor';
    this.registerUserData.IdRef = idVendedor;
    this.registerUserData.IdRol = 3;
    this.registerUserData.Estado = 'activo';
    console.log(this.registroVendedorData);
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