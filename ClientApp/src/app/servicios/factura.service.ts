import { Factura } from '../modelos/factura.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Dosificacion } from '../modelos/dosificacion.model';
import { Pedido } from '../modelos/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  formData: Factura;
  filterData: PageAndSort;
  //readonly rootURL = 'http://perezleonardo.somee.com/api';
  list: Factura[];
 
  listDosificacion: Dosificacion[];
  listPedido: Pedido[];
  
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

  listDosificaciones() {
    
    this.http.get(`${environment.apiUrl}Dosificaciones` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listDosificacion = (res as any).Datos as Dosificacion[]);

      console.log(this.list);
  }
  listPedidos() {
    
    this.http.get(`${environment.apiUrl}Pedidos` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listPedido = (res as any).Datos as Pedido[]);

      console.log(this.list);
  }
 
  postFactura() {
    return this.http.post(`${environment.apiUrl}Facturas`, this.formData);
  }
  putFactura() {
    return this.http.put(`${environment.apiUrl}Facturas/${this.formData.Id}`, this.formData);
  }
  deleteFactura(id) {
    return this.http.delete(`${environment.apiUrl}Facturas/${id}`);
  }

  refreshList() {
    this.http.get(`${environment.apiUrl}Facturas` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Factura[]);
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

  
}