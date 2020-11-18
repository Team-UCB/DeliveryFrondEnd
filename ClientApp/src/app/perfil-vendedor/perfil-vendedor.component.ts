import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { from } from 'rxjs';
import { VendedorService } from '../servicios/vendedor.service';

@Component({
  selector: 'app-perfil-vendedor',
  templateUrl: './perfil-vendedor.component.html',
  styles: [
  ]
})
export class PerfilVendedorComponent implements OnInit {

  datos;
  opcionRubro: number=0;
  verSeleccion:string='';
  //imagen
  imageError: string;
  isImageSaved: boolean;
  //cardImageBase64: string;
  img: string='';

  constructor(public service: VendedorService, private toastr: ToastrService) { }
  
  capturar(id){
    this.service.formData.IdRubro=parseInt(id);
  }

  ngOnInit(): void {
    this.resetForm();
    this.service.listRubros();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
    Id: 0,
    PersonaContacto: '',
    Celular: '',
    Telefono: '',
    Correo: '',
    NombreEmpresa: '',
    Direccion: '',
    PathLogo: 'assets/img/2.jpg',
    IdRubro: 0
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
    this.service.cardImageBase64 = '';
  }

  updateRecord(form: NgForm) {
    //
    this.img = this.service.cardImageBase64;
    this.service.formData.PathLogo = this.img;

    this.service.putVendedor().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Se actualizo', 'Detalles de Vendedor');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    //
    this.img = this.service.cardImageBase64;
    this.service.formData.PathLogo = this.img;

    this.service.postVendedor().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Se guardo', 'Detalles de pedido');
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

  //
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
