import { UsuarioService } from '../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styles: [
  ]
})
export class UsuarioFormComponent implements OnInit {

  opcionRol: number = 0;


  constructor(public service: UsuarioService, private toastr: ToastrService) { }




  capturar(id){
    this.service.formData.IdRol = parseInt(id);
  }




  ngOnInit(): void {
    this.resetForm();

    this.service.listRoles();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      Nombre:'',
      Clave: '',
      Estado: '',
      Entidad:'',
      IdRef:0,
      IdRol: 0
      
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putUsuario().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Detalles de Usuario');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    this.service.postUsuario().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
