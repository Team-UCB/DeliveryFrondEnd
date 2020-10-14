import { Calificacion } from '../modelos/calificacion.model';
import { Pedido } from '../modelos/pedido.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  formData: Calificacion;
  filterData: PageAndSort;
  list: Calificacion[];
   //agregar lista de producto para la llave foranea
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

  // Crear un metodo  que traiga todos los productos y los llene a la lista
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


  postCalificacion() {
    return this.http.post(`${environment.apiUrl}Calificaciones`, this.formData);
  }
  putCalificacion() {
    return this.http.put(`${environment.apiUrl}Calificaciones/${this.formData.Id}` , this.formData);
  }
  deleteCalificacion(id) {
    return this.http.delete(`${environment.apiUrl}Calificaciones/${id}`);
  }

  refreshList() {
    
    this.http.get(`${environment.apiUrl}Calificaciones` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Calificacion[]);

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
}