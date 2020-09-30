import { VendedorService } from '../../servicios/vendedor.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styles: [
  ]
})
export class VendedorFormComponent implements OnInit {

  constructor(public service: VendedorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
    Id: 0,
    PersonaContacto: '',
    Celular: '',
    Telefono: '',
    Correo: '',
    NombreEmpresa: '',
    Direccion: '',
    PathLogo: '',
    IdRubro: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putVendedor().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Detalles de Vendedor');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    this.service.postVendedor().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
