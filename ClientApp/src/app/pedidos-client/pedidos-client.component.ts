import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../modelos/pedido.model';
import { Vendedor } from '../modelos/vendedor.model';
import { PedidoService } from '../servicios/pedido.service';
import { RubroService } from '../servicios/rubro.service';
import { VendedorService } from '../servicios/vendedor.service';
import { PedidosclienteFormComponent } from './pedidoscliente-form/pedidoscliente-form.component';

@Component({
  selector: 'app-pedidos-client',
  templateUrl: './pedidos-client.component.html',
  styles: [
  ]
})
export class PedidosClientComponent implements OnInit {
  opcionRubro = 0;
  opcionVendedor = 0;
  pedidoCliente: Pedido;
  pedidoObtenido: Pedido;

  listaVendedoresFiltrada: Vendedor[];
  constructor(public service: PedidoService , private toastr: ToastrService, private _router: Router) { }

  capturarRubro(id) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.opcionRubro = parseInt(id);
  }

  ngOnInit(): void {
    this.service.listRubros();
    this.service.listVendedorRubro=null;
  }

  buscarVendedores()
  {
    this.ObtenerVendedores();
  }

  CrearPedido(idVendedor)
  {
    localStorage.setItem('VendedorId', idVendedor);
    this.pedidoCliente = new Pedido();
    // tslint:disable-next-line: radix
    this.pedidoCliente.IdCliente = parseInt(localStorage.getItem('UserId'));
    this.pedidoCliente.IdVendedor = idVendedor;

    // aqui llamo al post de pedido y traigo al pedidoObtenido el guardado 
    this.insertRecord(this.pedidoCliente);
  }

  FiltrarListaProductos(Palabra)
  {
    this.listaVendedoresFiltrada = this.service.listVendedorRubro.filter(li=> this.coincide(li.NombreEmpresa.toString(),Palabra) )
  }

  coincide(valor1: string, valor2: string) {
    return valor1
      .toLowerCase()
      .match(valor2.toLowerCase())
  }

  insertRecord(pedido) {
    this.service.postPedidoCliente(pedido).then(
      res => {
       this.pedidoObtenido = res as any;
       localStorage.setItem('PedidoId', this.pedidoObtenido.Id.toString());
       this.ngOnInit();
       this._router.navigate(['/pedidosClientform']);
      },
      err => { console.log(err); }
    );
  }

  resetForm(form?: NgForm) {
    this.opcionRubro = 0;
    this.opcionVendedor = 0;
    this.service.listVendedorRubro = null;
  }

  ObtenerVendedores() {
    this.service.listVendedoresRubro(this.opcionRubro).then(
      res => {
       this.listaVendedoresFiltrada = res as any;
       if(this.listaVendedoresFiltrada.length == 0)
       {
          this.toastr.info('Porfavor seleccione otro rubro.');
       }
      },
      err => { console.log('No habia nada'); }
    );
  }

}
