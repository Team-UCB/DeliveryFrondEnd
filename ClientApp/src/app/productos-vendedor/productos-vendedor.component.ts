import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-productos-vendedor',
  templateUrl: './productos-vendedor.component.html',
  styles: [
  ]
})
export class ProductosVendedorComponent implements OnInit {

  constructor(public service: ProductoService,private _router:Router) {

   }

  ngOnInit(): void {

    this.service.Listproductosvendedor();

  }

}
