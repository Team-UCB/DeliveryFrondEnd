import { Component, OnInit, ViewChildren, QueryList  } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vista-vp',
  templateUrl: './vista-vp.component.html',
  styles: [
  ]
})
export class VistaVPComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: PedidoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.llamarDatos();
    this.service.listarEstados("Pendiente");
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }
  ObjListaPedidoCan(obj) {
    this.service.formDataListaPedidos = Object.assign({}, obj);
    this.service.formDataListaPedidos.Estado = "Cancelado";
    this.cancelarPedido(this.service.formDataListaPedidos.Id);
  }
  ObjListaPedidoAcep(obj) {
    this.service.formDataListaPedidos = Object.assign({}, obj);
    this.service.formDataListaPedidos.Estado = "Preparacion";
    this.aceptarPedido(this.service.formDataListaPedidos.Id);
  }

  cancelarPedido(id) {
    this.service.formData = this.service.formDataListaPedidos;
    this.service.putPedido().subscribe(
      res => {
        this.toastr.info('Cancelando', 'Pedido');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  aceptarPedido(id) {
    this.service.formData = this.service.formDataListaPedidos;
    this.service.putPedido().subscribe(
      res => {
        this.toastr.info('Procesando', 'Pedido');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.filterData.Columna = column;
    this.service.filterData.Direccion = direction;
    this.service.refreshList();
  }

  filtrar(filtro) {
    // resetting other headers
    this.service.filtrar(filtro);
  }
  listar(cantidad) {
    // resetting other headers
    this.service.listarEstados(cantidad);
  }

  Anterior(){
    this.service.Anterior();
  }
  Siguiente(){
    this.service.Siguiente();
  }

  idVen:number=0;
  llamarDatos(){
    this.idVen = parseInt(localStorage.getItem('IdRef'));
  }
}
