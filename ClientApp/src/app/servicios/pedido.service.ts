import { Pedido } from '../modelos/pedido.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Transportador } from '../modelos/transportador.model';
import { Vendedor } from '../modelos/vendedor.model';
import {Cliente} from '../modelos/cliente.model';
import { Rubro } from '../modelos/rubro.model';
import { Producto } from '../modelos/producto.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  formData: Pedido;
  filterData: PageAndSort;
  list: Pedido[];
  opcionVendedor = 0;

  // Agregar lista de producto para la llave foranea
  listCliente: Cliente[];
  listVendedor: Vendedor[];
  listTransportador: Transportador[];
  listProductos: Producto[];
  PedidoObtenido: Pedido;

  //
  listVendedorRubro: Vendedor[];
  listRubro: Rubro[];
 
  total = 0;
  tam = 0;

  constructor(private http: HttpClient, private _router: Router) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "desc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
    this.PedidoObtenido= new Pedido;
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
  
  listRubros() {
    return this.http.get(`${environment.apiUrl}Rubros` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listRubro = (res as any).Datos as Rubro[]);
  }

  listVendedoresRubro(id) {

   return this.http.get(`${environment.apiUrl}Vendedores/${id}`)
      .toPromise()
      .then(res => this.listVendedorRubro = (res as any) as Vendedor[]);
  }

 listProductosVendedor(id) {

   return this.http.get(`${environment.apiUrl}Productos/${id}`)
      .toPromise()
      .then(res => this.listProductos = (res as any) as Producto[]);

  }

  ObtenerPedidoClient(id) {

    return this.http.get(`${environment.apiUrl}pedidos/${parseInt(id)}`).
     toPromise().then(res => this.PedidoObtenido = (res as any));

    }

  postPedidoCliente(Pedido: Pedido) {
    return this.http.post(`${environment.apiUrl}pedidos`, Pedido).toPromise().then(res => this.PedidoObtenido = (res as any));
  }
  putPedidoClient(id ,Pedido) {
    return this.http.put(`${environment.apiUrl}pedidos/${id}`, Pedido);
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
   // AÑADIENDO

}