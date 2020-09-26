import { Component, OnInit } from '@angular/core';
import { DetalleFacturaService } from '../../servicios/detalle-factura.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-factura-form',
  templateUrl: './detalle-factura-form.component.html',
  styles: [
  ]
})
export class DetalleFacturaFormComponent implements OnInit {

  constructor(public service: DetalleFacturaService, private toastr: ToastrService) { }
 
  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      Cantidad:null,
      Monto:null,
      Descripcion:'',
      IdDetallePedido:0,
      IdFactura:0
    }
  } 

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putDetalleFactura().subscribe(
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
    this.service.postDetalleFactura().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  } 

}
