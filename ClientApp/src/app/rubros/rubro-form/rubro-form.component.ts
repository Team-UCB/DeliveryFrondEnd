import { Component, OnInit } from '@angular/core';
import { RubroService } from '../../servicios/rubro.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rubro-form',
  templateUrl: './rubro-form.component.html',
  styles: [
  ]
})
export class RubroFormComponent implements OnInit {

  constructor(public service: RubroService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      Nombre:'',
      Descripcion:''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putRubro().subscribe(
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
    this.service.postRubro().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

}
