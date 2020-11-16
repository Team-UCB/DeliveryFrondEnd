import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../modelos/vendedor.model';
import { VendedorService } from '../servicios/vendedor.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-registrar-vendedor',
  templateUrl: './registrar-vendedor.component.html',
  styles: [
  ]
})
export class RegistrarVendedorComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  //cardImageBase64: string;
  img: string='';

  opcionSeleccionado: number=0;
  verSeleccion: string = '';
  registrarVendedorData: Vendedor;
  constructor(public _vendedorSvr: VendedorService, private _routes: Router) {
    this.registrarVendedorData = new Vendedor(); 
   }

  ngOnInit(): void {
  }

  registrarVendedor(): void{
    this.img = this._vendedorSvr.cardImageBase64;
    this._vendedorSvr.formData1.PathImg = this.img;
         console.log(this.registrarVendedorData);     
         this._vendedorSvr.formData = this.registrarVendedorData;
         this._vendedorSvr.postVendedor().subscribe(
           res => {
             console.log(res);
             this._routes.navigate(['/']);
            },
            err => {
              console.log(err); }
              );
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
                              this._vendedorSvr.cardImageBase64 = imgBase64Path;
                              this.isImageSaved = true;
                              // this.previewImagePath = imgBase64Path;
                          }
                      };
                  };
                  reader.readAsDataURL(fileInput.target.files[0]);
                  console.log(this._vendedorSvr.cardImageBase64);
              }
          }
}
