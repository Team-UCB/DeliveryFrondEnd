import { Pedido } from '../modelos/pedido.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Cliente } from '../modelos/cliente.model';
import { Vendedor } from '../modelos/vendedor.model';
import { Transportador } from '../modelos/transportador.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  formData: Pedido;
  filterData: PageAndSort;
  //readonly rootURL = 'http://perezleonardo.somee.com/api';
  list: Pedido[];
  //agregar lista de producto para la llave foranea
  listCliente: Cliente[];
  listVendedor: Vendedor[];
  listTransportador: Transportador[];
  //
  total = 0;
  tam = 0;

  constructor(private http: HttpClient, private _router: Router) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "asc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
  }

  listClientes() {
    
    this.http.get(`${environment.apiUrl}Clientes` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listCliente = (res as any).Datos as Cliente[]);

      console.log(this.list);
  }
  listVendedores() {
    
    this.http.get(`${environment.apiUrl}Vendedores` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listVendedor = (res as any).Datos as Vendedor[]);

      console.log(this.list);
  }
  listTransportadores() {
    
    this.http.get(`${environment.apiUrl}Transportadores` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listTransportador = (res as any).Datos as Transportador[]);

      console.log(this.list);
  }
  postPedido() {
    return this.http.post(`${environment.apiUrl}Pedidos`, this.formData);
  }
  putPedido() {
    return this.http.put(`${environment.apiUrl}Pedidos/${this.formData.Id}`, this.formData);
  }
  deletePedido(id) {
    return this.http.delete(`${environment.apiUrl}Pedidos/${id}`);
  }



  refreshList() {
    this.http.get(`${environment.apiUrl}Pedidos` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Pedido[]);
  }

  filtrar(filtro) {
    this.filterData.Filtro = filtro;
    this.refreshList();
  }

  listar(cantidad) {
    this.filterData.TamPagina = cantidad;
    this.refreshList();
  }

  Anterior() {
    this.filterData.Pagina = this.filterData.Pagina - 1;
    this.refreshList();
  }

  Siguiente() {
    this.filterData.Pagina = this.filterData.Pagina + 1;
    this.refreshList();
  }

  //funcionalidad de listar los pedidos
  formDataListaPedidos: Pedido;

   listarEstados(cantidad) {
    this.filterData.Filtro = cantidad;
      this.refreshList();
  }


  ObtenerPedidoRepartidor(id){

    return  this.http.get(`${environment.apiUrl}pedidos/getPedidoRepartidor/${id}`);
  }
  ObtenerPedidoPendiente()
  {
    return  this.http.get(`${environment.apiUrl}pedidos/getPedidoPendiente`);

  }
}