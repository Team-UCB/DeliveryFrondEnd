import { Direccion } from '../modelos/direccion.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Cliente } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  formData: Direccion;
  filterData: PageAndSort;
  list: Direccion[];
  //agregar lista de producto para la llave foranea
  listCliente: Cliente[];
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

  // Crear un metodo  que traiga todos los productos y los llene a la lista
  listClientes() {
    
    this.http.get(`${environment.apiUrl}Clientes` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listCliente = (res as any).Datos as Cliente[]);
  }

  postDireccion() {
    return this.http.post(`${environment.apiUrl}Direcciones`, this.formData);
  }
  putDireccion() {
    return this.http.put(`${environment.apiUrl}Direcciones/${this.formData.Id}` , this.formData);
  }
  deleteDireccion(id) {
    return this.http.delete(`${environment.apiUrl}Direcciones/${id}`);
  }

  refreshList() {
    
    this.http.get(`${environment.apiUrl}Direcciones` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Direccion[]);

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

  //funcionalida repartidor-pedido
  direccionesCliente: Direccion[];
  formDataDir: Direccion;
  getDireccionCliente(id) {
    return this.http.get(`${environment.apiUrl}Direcciones/${id}`);
  }
}