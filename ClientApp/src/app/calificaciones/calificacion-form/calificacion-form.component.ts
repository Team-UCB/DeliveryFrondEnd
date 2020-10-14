import { CalificacionService } from '../../servicios/calificacion.service'; 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-calificacion-form',
  templateUrl: './calificacion-form.component.html',
  styleUrls: []
})
export class CalificacionFormComponent implements OnInit {
  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: number=0;
  verSeleccion: string = '';

  constructor(public service: CalificacionService, private toastr: ToastrService) { }

  capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdPedido = parseInt(id);
    
    console.log(this.opcionSeleccionado);
  }

  ngOnInit(): void {
    this.resetForm();
    //
    this.service.listPedidos();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      IdOrigen: 0,
      IdDestino: 0,
      Puntaje: 0,
      Observaciones: '',
      Tipo: '',
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
    this.service.putCalificacion().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Datos Guardados', 'Calificacion');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postCalificacion().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
