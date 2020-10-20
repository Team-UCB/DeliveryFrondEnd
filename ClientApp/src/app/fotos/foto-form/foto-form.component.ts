import { Component, OnInit } from '@angular/core';
import { FotoService } from '../../servicios/foto.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-foto-form',
  templateUrl: './foto-form.component.html',
  styles: [
  ]
})
export class FotoFormComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  //cardImageBase64: string;
  img: string='';

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
    this.service.listProductos();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 0,
      Descripcion:"",
      PathImg:"assets/img/2.jpg",
      IdProducto:0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
    this.service.cardImageBase64="";
  }
  updateRecord(form: NgForm) {
    this.img = this.service.cardImageBase64;
    this.service.formData.PathImg = this.img;
    this.service.putFotos().subscribe(
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
    this.img = this.service.cardImageBase64;
    this.service.formData.PathImg = this.img;
    this.service.postFotos().subscribe(
      res => {
        this.resetForm(form);
       
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.service.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
        console.log(this.service.cardImageBase64);
    }
    
}
}
