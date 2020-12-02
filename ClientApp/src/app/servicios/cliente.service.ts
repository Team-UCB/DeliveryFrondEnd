import { Cliente } from '../modelos/cliente.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  formData: Cliente;
  filterData: PageAndSort;
  list: Cliente[];
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

  postCliente() {
    return this.http.post(`${environment.apiUrl}Clientes`, this.formData);
  }
  putCliente() {
    return this.http.put(`${environment.apiUrl}Clientes/${this.formData.Id}` , this.formData);
  }
  deleteCliente(id) {
    return this.http.delete(`${environment.apiUrl}Clientes/${id}`);
  }

  refreshList() {
    
    this.http.get(`${environment.apiUrl}Clientes` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Cliente[]);

      console.log(this.list);
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

  ObtenerClientePedido(id){
    return  this.http.get(`${environment.apiUrl}clientes/getClientePedido/${id}`);
  }
}
