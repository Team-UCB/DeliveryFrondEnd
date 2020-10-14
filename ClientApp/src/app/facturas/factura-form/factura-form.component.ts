import { FacturaService } from '../../servicios/factura.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styles: [
  ]
})
export class FacturaFormComponent implements OnInit {
  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionDosificacion: number=0;
  opcionPedido: number=0;
  verSeleccion: string = '';
  constructor(public service: FacturaService, private toastr: ToastrService) {

   
   }
   capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdPedido = parseInt(id);
    this.service.formData.IdDosificacion = parseInt(id);
   
  }

  ngOnInit(): void {
    this.resetForm();
    //
    this.service.listDosificaciones();
    this.service.listPedidos();
    //
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      NroFactura: 0,
      FechaEmision: '',
      Estado: '',
      CodigoControl: '',
      Observaciones: '',
      IdDosificacion: 0,
      IdPedido: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putFactura().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Detalles de factura');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postFactura().subscribe(
      res => {
        this.resetForm(form);
       
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
