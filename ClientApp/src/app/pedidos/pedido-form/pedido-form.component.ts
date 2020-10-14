import { PedidoService } from '../../servicios/pedido.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styles: [
  ]
})
export class PedidoFormComponent implements OnInit {
  datos;
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionCliente: number=0;
  opcionVendedor: number=0;
  opcionTransporte: number=0;
  verSeleccion: string = '';
  constructor(public service: PedidoService, private toastr: ToastrService) {

   
   }
   capturar(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.service.formData.IdCliente = parseInt(id);
    this.service.formData.IdVendedor = parseInt(id);
    this.service.formData.IdTransporte = parseInt(id);
   
  }

  ngOnInit(): void {
    this.resetForm();
    //
    this.service.listClientes();
    this.service.listVendedores();
    this.service.listTransportadores();
    //
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      FechaIngreso: '',
      FechaAtencion: '',
      FechaSalida: '',
      FechaEntrega: '',
      Estado: '',
      CodigoQrFactura: '',
      MontoEnvio: 0,
      TipoPago: '',
      MontoCliente: 0,
      IdCliente: 0,
      IdVendedor: 0,
      IdTransporte: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putPedido().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Detalles de pedido');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postPedido().subscribe(
      res => {
        this.resetForm(form);
       
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
