import { Component, OnInit } from '@angular/core';
import { DetallePedidoService } from '../../servicios/detalle-pedido.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-pedido-form',
  templateUrl: './detalle-pedido-form.component.html',
  styles: [
  ]
})
export class DetallePedidoFormComponent implements OnInit {
 
  constructor(public service: DetallePedidoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      IdPedido:null,
      IdProducto:null,
      Cantidad:0,
      SubMonto:0
    }
  } 

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putDetallePedido().subscribe(
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
    this.service.postDetallePedido().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  } 

}
