import { OfertaService } from '../../servicios/oferta.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styles: [
  ]
})
export class OfertaFormComponent implements OnInit {
  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: number=0;
  verSeleccion: string = '';
  constructor(public service: OfertaService, private toastr: ToastrService) {

   
   }
   capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdProducto = parseInt(id);
    
    console.log(this.opcionSeleccionado);
  }

  ngOnInit(): void {
    this.resetForm();
    //
    this.service.listProductos();
    //
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      FechaFin:'',
      FechaInicio:'',
      PrecioOferta:0,
      IdProducto:0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putOferta().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Detalles de oferta');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postOferta().subscribe(
      res => {
        this.resetForm(form);
       
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
