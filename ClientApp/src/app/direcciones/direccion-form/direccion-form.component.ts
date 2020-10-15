import { DireccionService } from '../../servicios/direccion.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: []
})
export class DireccionFormComponent implements OnInit {
  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: number=0;
  verSeleccion: string = '';

  constructor(public service: DireccionService, private toastr: ToastrService) { }

  capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdCliente = parseInt(id);
    console.log(this.opcionSeleccionado);
  }
  ngOnInit(): void {
    this.resetForm();
    //
    this.service.listClientes();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      Descripcion: '',
      Latitud: 0,
      Longitud:  0,
      Referencia: '',
      Predeterminada: false,
      IdCliente: 0
    }
  }

  onSubmit(form: NgForm) {

    this.service.formData.Predeterminada=Boolean(this.service.formData.Predeterminada);
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putDireccion().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Datos Guardados', 'Dirección');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postDireccion().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

}
