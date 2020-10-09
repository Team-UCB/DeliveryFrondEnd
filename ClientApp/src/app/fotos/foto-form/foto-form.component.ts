import { Component, OnInit } from '@angular/core';
import { FotoService } from '../../servicios/foto.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foto-form',
  templateUrl: './foto-form.component.html',
  styles: [
  ]
})
export class FotoFormComponent implements OnInit {
  opcionSeleccionado: number=0;
  verSeleccion: string = '';
  constructor(public service: FotoService, private toastr: ToastrService) { }
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
      Descripcion:"",
      PathImg:"",
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
    this.service.putOFotos().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Fotos');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    console.log(this.service.formData);
    this.service.postFotos().subscribe(
      res => {
        this.resetForm(form);
       
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

}
