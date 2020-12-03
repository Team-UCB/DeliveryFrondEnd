import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/modelos/producto.model';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { identifierModuleUrl, ThrowStmt } from '@angular/compiler';
import { DetallePedidoService } from 'src/app/servicios/detalle-pedido.service';
import { Pedido } from 'src/app/modelos/pedido.model';
import { DetallePedido } from 'src/app/modelos/detalle-pedido.model';
import { NgForm } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core'

;
@Component({
  selector: 'app-pedidoscliente-form',
  templateUrl: './pedidoscliente-form.component.html',
  styles: [
  ]
})
export class PedidosclienteFormComponent implements OnInit {

  pedidoId = parseInt(localStorage.getItem('PedidoId'));
  vendedorId= parseInt(localStorage.getItem('VendedorId'));
  listaDetalles : DetallePedido[];
  pedidoTerminado : Pedido;
  pedidoGuardar: Pedido;

  closeResult: string;

   //VARIABLES PARA MOSTARR
   nombreProducto= "";
   precioProducto= 0.0;
   productoSeleccionado=0; 
   cantidadProducto=0;
   submontoProducto=0;
   montototal=0.0;
   listaProductosFiltrada: Producto[];

  constructor(private modalService: NgbModal,public serviceDetallePedido: DetallePedidoService, 
              public service: PedidoService, public serviceProducto: ProductoService, 
              private toastr: ToastrService, private _router: Router   ) { }
  
  ngOnInit(): void {
   
    this.ObtenerListaProductosVendedor();
    this.ObtenerDetallesPedido();
    this.pedidoTerminado=new Pedido;
    this.pedidoTerminado.TipoPago="Tipo de pago";
  }



  FiltrarListaProductos(Palabra)
  {
    this.listaProductosFiltrada = this.service.listProductos.filter(li=> this.coincide(li.Nombre.toString(),Palabra) )
  }

  GuardarPedido()
  {
    this.updatePedido(this.pedidoId,this.pedidoTerminado);
  }

  coincide(valor1: string, valor2: string) {
    return valor1
      .toLowerCase()
      .match(valor2.toLowerCase())
  }

  updatePedido(id,pedido) {

    if(this.pedidoTerminado.TipoPago!="Tipo de pago")
    {
          if( this.serviceDetallePedido.listDetallesPedido.length!=0 )
          {
            this.service.ObtenerPedidoClient(id).then(
              res => {
              this.pedidoGuardar = res as any;
              this.pedidoGuardar.MontoCliente = this.pedidoTerminado.MontoCliente;
              this.pedidoGuardar.TipoPago = this.pedidoTerminado.TipoPago;
              this.pedidoGuardar.Estado = "solicitado";
              this.service.putPedidoClient(id,this.pedidoGuardar).subscribe(
                    res2 => {
                      this.toastr.info('El pedido esta en progreso, Gracias por su pedido =)');
                      this._router.navigate(['/pedidosClient']);
                    },
                    err => {
                      console.log(err);
                    })
              },
            );
          }
          else
          {
             this.toastr.info('Porfavor ingrese productos a su pedido');
          }
        }
        else
        {
          this.toastr.info('Porfavor selecione un tipo de pago');
        }
  }

  aumentarCantidad()
 {
    this.cantidadProducto=this.cantidadProducto+1;
    this.submontoProducto=this.cantidadProducto*this.precioProducto;
  }

  quitarCantidad()
 {
  if(this.cantidadProducto>0){
    this.cantidadProducto=this.cantidadProducto-1;
    this.submontoProducto=this.cantidadProducto*this.precioProducto;
  }
  }

  insertRecord() {


    var productoRepetido=this.serviceDetallePedido.listDetallesPedido.filter(c=>c.IdProducto==this.productoSeleccionado);
    if( productoRepetido.length==0)
    {

      this.serviceDetallePedido.formData=new DetallePedido; 
      this.serviceDetallePedido.formData.IdPedido=this.pedidoId;
      this.serviceDetallePedido.formData.IdProducto=this.productoSeleccionado;
      this.serviceDetallePedido.formData.Cantidad=this.cantidadProducto;
      this.serviceDetallePedido.formData.SubMonto=this.submontoProducto;
    
      if(this.serviceDetallePedido.formData.Cantidad!=0)
      {
        this.serviceDetallePedido.postDetallePedido().subscribe(
          res => {
            this.service.listProductosVendedor(this.vendedorId);
            this.modalService.dismissAll();
            this.ngOnInit();
          },
          err => { console.log(err); }
         )
      }
      else
      {
        this.toastr.info('Debe aumentar la cantidad del producto seleccionado');
      }

    }
    else
    {
      this.modalService.dismissAll();
      this.toastr.info('No puede ingresar dos veces el mismo producto');
    }

  }

  open(content,nombre,precio,Id) {

    this.nombreProducto=nombre;
    this.precioProducto= precio;
    this.productoSeleccionado=Id;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => { 
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.resetValoresProducto();
    });
  }

  onDelete(id) {
    this.serviceDetallePedido.deleteDetallePedido(id)
      .subscribe(res => {
        this.ngOnInit();
        this.toastr.info('Se borro el producto de su pedido =( ');
      },
        err => { console.log(err); })
  }

  ObtenerDetallesPedido() {
  this.serviceDetallePedido.listDetallesPedidos(this.pedidoId).then(
    res => {

     this.listaProductosFiltrada=this.service.listProductos;
     this.listaDetalles = res as any;
     this.montototal=0;
     this.listaDetalles.forEach(element =>  {
        this.montototal= this.montototal+element.SubMonto;
     });

    },
    err => { console.log(err); }
  )
  }

  ObtenerListaProductosVendedor()
  {
    this.service.listProductosVendedor(this.vendedorId).then(
      res => {
       this.listaProductosFiltrada=res as any;
      },
      err => { console.log(err); }
    )
  }

  onDeletePedido() {
    if (confirm('Esta seguro de borrar todo el pedido ?')) {
      this.service.deletePedido(this.pedidoId)
        .subscribe(res => {
          this.toastr.info('El pedido se cancelo =(');
          this._router.navigate(['/pedidosClient']);
        },
          err => { console.log(err); })
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  resetValoresProducto()
  {
   this.nombreProducto= "";
   this.precioProducto= 0.0;
   this.productoSeleccionado=0; 
   this.cantidadProducto=0;
   this.submontoProducto=0;
  }


}
