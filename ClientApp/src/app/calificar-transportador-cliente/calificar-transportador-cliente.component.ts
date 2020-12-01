import { CalificacionService } from '../servicios/calificacion.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calificar-transportador-cliente',
  templateUrl: './calificar-transportador-cliente.component.html',
  styles: [ `
  .star {
    font-size: 1.5rem;
    color: #b0c4de;
  }
  .filled {
    color: #1e90ff;
  }
  .bad {
    color: #deb0b0;
  }
  .filled.bad {
    color: #ff1e1e;
  }
`
  ]
})
export class CalificarTransportadorClienteComponent implements OnInit {
  // Puntuar
  currentRate = 6;

  datos;
  // Select
  opcionSeleccionado: number = 0;
  verSeleccion: string = '';

  // Foranea
  opcionDestino: number = 0;

  constructor(public service: CalificacionService, private toastr: ToastrService) { }

  capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdPedido = parseInt(id);
    console.log(this.opcionSeleccionado);
  }

  capturarDestinoCliente(id) {
    this.service.formData.IdDestino = parseInt(id);
  }

  ngOnInit(): void {
    this.llamarDatos();
    this.resetForm();
    //
    this.service.listPedidos();
  }

  // ID TRANSPORTADOR
  idTrans:number = 0;
  llamarDatos(){
    this.idTrans = parseInt(localStorage.getItem('IdRef'));
    console.log(localStorage.getItem('IdRef'));
  }

  puntuar: number = 0;
  puntaje(current){
    this.puntuar = parseInt(current);
    console.log(this.puntuar);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      IdOrigen: this.idTrans,
      IdDestino: this.service.formDataVendedor.Id,
      //IdDestino: 0,
      Puntaje: 0,
      Observaciones: '',
      Tipo: 'Transportador-cliente',
      IdPedido: this.service.formDataPedido.Id
      //IdPedido:0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.formData.Puntaje = this.puntuar;
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
    this.service.formData.Puntaje = this.puntuar;
    this.service.postCalificacion().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
