import { TransportadorService } from '../../servicios/transportador.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transportador-form',
  templateUrl: './transportador-form.component.html',
  styles: [
  ]
})
export class TransportadorFormComponent implements OnInit {

  constructor(public service: TransportadorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      NombreCompleto:'',
      Celular:'',
      DescripcionVehiculo:'',
      TipoVehiculo:'',
      Estado:'',
      Latitud:0,
      Longitud:0

    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putTransportador().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Editado correctamente', 'Detalles de transportador');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    this.service.postTransportador().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
