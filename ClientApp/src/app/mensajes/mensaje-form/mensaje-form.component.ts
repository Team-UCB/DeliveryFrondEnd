import { MensajeService } from '../../servicios/mensaje.service'; 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-mensaje-form',
  templateUrl: './mensaje-form.component.html',
  styleUrls: []
})
export class MensajeFormComponent implements OnInit {
  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: number=0;
  verSeleccion: string = '';

  constructor(public service: MensajeService, private toastr: ToastrService) { }

   capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdChat = parseInt(id);
    console.log(this.opcionSeleccionado);
   }
    ngOnInit(): void {
    this.resetForm();
    //
    this.service.listChats();
  }


//REVISAR HORA 
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      FechaHora: '',
      Text: '',
      IdChat: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putMensaje().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Datos Guardados', 'Mensaje');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postMensaje().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

}