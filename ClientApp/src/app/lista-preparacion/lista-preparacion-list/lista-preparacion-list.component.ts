import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-preparacion-list',
  templateUrl: './lista-preparacion-list.component.html',
  styles: [
  ]
})
export class ListaPreparacionListComponent implements OnInit {

  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: PedidoService,  private toastr: ToastrService, private _router: Router) { }

  ngOnInit(): void {
    this.llamarDatos();
    this.service.refreshList();    
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    
  }
  
  ObjListaPreparacionAten(obj) {
    this.service.formDataListaPedidos = Object.assign({}, obj);
    this.service.formDataListaPedidos.Estado = "En Curso";
    this.atenderPedido(this.service.formDataListaPedidos.Id);
  }

  mostrarPedidos(estado : string)
  {
    if(estado!="En Curso")
    {
      return false;
    }
    else{
      return true;
    }
  }

  

  atenderPedido(id) {
    this.service.formData = this.service.formDataListaPedidos;
    this.service.putPedido().subscribe(
      res => {
        this.toastr.info('Atendiendo', 'Pedido');
        this.service.formData.Estado = "Despachado";
        this.ngOnInit();
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
    this.service.listar(cantidad);
  }
  Inicio(){
    this._router.navigate(['/inicio']);

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
