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



  constructor(public serviceVendedor: VendedorService, private toastr: ToastrService,
    public serviceCliente: ClienteService,
    public servicePedido: PedidoService ,
    public servicedetallePedido: DetallePedidoService) { }

ngOnInit(): void {
  this.vendedor= new Vendedor;
  this.comprador= new Cliente;



  

this.pedidoRepartidor();    

}


Finalizarpe(obj) {
  this.servicePedido.formDataListaPedidos = Object.assign({}, obj);
  this.servicePedido.formDataListaPedidos.Estado = "Finalizado";
  this.FINALIZARPEDIDO(this.servicePedido.formDataListaPedidos.Id);
}


FINALIZARPEDIDO(id) {
  this.servicePedido.formData = this.servicePedido.formDataListaPedidos;
  this.servicePedido.putPedido().subscribe(
    res => {
      this.toastr.info('Finalizado', 'Pedido');
      this.servicePedido.formData.Estado = "Despachado";
      this.ngOnInit();
    },
    err => {
      console.log(err);
    }
  )
}








    


pedidoRepartidor(){
this.servicePedido.ObtenerPedidoRepartidor(1).subscribe(res=>{
     this.pedido=res as any as Pedido;
    
     this.servicePedido.formData = Object.assign({}, this.pedido);

     
     this.servicedetallePedido.listDetallesPedidos(this.pedido.Id).then(
      res => {      
        
       this.listDetallePedido = res as any;       
  
      },
      err => { console.log(err); }
    )

     this.serviceVendedor.ObtenerPedidoVendedor(this.pedido.IdVendedor).subscribe(res=>{
      this.vendedor= res as any;
      
    })
    this.serviceCliente.ObtenerClientePedido(this.pedido.IdCliente).subscribe(res=>{
          this.comprador = res as any;
         
    })    
  
})


}

}
