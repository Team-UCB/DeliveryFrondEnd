import { ClienteService } from '../../servicios/cliente.service'; 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  constructor(public service: ClienteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      NombresApellidos: '',
      Celular: '',
      Telefono: ''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putCliente().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Datos Guardados', 'Detalles de Cliente');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postCliente().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
