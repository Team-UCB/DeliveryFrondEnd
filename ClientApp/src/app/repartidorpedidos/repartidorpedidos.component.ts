import { Component, OnInit, ɵConsole } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../modelos/cliente.model';
import { Pedido } from '../modelos/pedido.model';
import { Vendedor } from '../modelos/vendedor.model';
import { ClienteService } from '../servicios/cliente.service';
import { PedidoService } from '../servicios/pedido.service';
import { VendedorService } from '../servicios/vendedor.service';
import { DetallePedido } from '../modelos/detalle-pedido.model';
import { DetallePedidoService } from '../servicios/detalle-pedido.service';
import { DetallePedidosComponent } from '../detalle-pedidos/detalle-pedidos.component';
import { CalificacionService } from '../servicios/calificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repartidorpedidos',
  templateUrl: './repartidorpedidos.component.html',
  styles: [
  ]
})
export class RepartidorpedidosComponent implements OnInit {

  vendedor: Vendedor;
  comprador: Cliente;
  pedido: Pedido;
  listDetallePedido: DetallePedido[];



  constructor(public serviceVendedor: VendedorService, private toastr: ToastrService, private _routes: Router,
              public serviceCliente: ClienteService,
              public servicePedido: PedidoService ,
              public servicedetallePedido: DetallePedidoService,
              public serviceCalificacion: CalificacionService) { }

ngOnInit(): void {
  this.vendedor = new Vendedor;
  this.comprador = new Cliente;
  this.pedidoRepartidor();

}


pedidoRepartidor(){
  this.servicePedido.ObtenerPedidoRepartidor(localStorage.getItem('IdRef')).subscribe(res => {
       this.pedido = res as any as Pedido;
       this.servicedetallePedido.listDetallesPedidos(this.pedido.Id).then(
        // tslint:disable-next-line: no-shadowed-variable
        res => {
        this.listDetallePedido = res as any;
        // Para calificar
        this.serviceCalificacion.formDataPedido = this.pedido;
        },
        err => { console.log(err); }
      );

       this.serviceVendedor.ObtenerPedidoVendedor(this.pedido.IdVendedor).subscribe( 
         // tslint:disable-next-line: no-shadowed-variable
         res => {
          this.vendedor = res as any;
          //Para calificar
          this.serviceCalificacion.formDataVendedor = this.vendedor;
        }
      );

       this.serviceCliente.ObtenerClientePedido(this.pedido.IdCliente).subscribe( 
          // tslint:disable-next-line: no-shadowed-variable
          res => {
            this.comprador = res as any;
            //Para calificar
          this.serviceCalificacion.formDataCliente = this.comprador;
          });
  });
}

  // FINALIZAR PEDIDO TRANSPORTADOR

  Finalizarpe(obj) {
  this.servicePedido.formDataListaPedidos = Object.assign({}, obj);
  this.servicePedido.formDataListaPedidos.Estado = 'Finalizado';
  this.finalizarPedido(this.servicePedido.formDataListaPedidos.Id);
  }


  finalizarPedido(id) {
    this.servicePedido.formData = this.servicePedido.formDataListaPedidos;
    this.servicePedido.putPedido().subscribe(
      res => {
        this.toastr.info('Finalizado', 'Pedido');
        this.servicePedido.formData.Estado = 'Despachado';
        this._routes.navigate(['/calificar-trans-ven']);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }
}