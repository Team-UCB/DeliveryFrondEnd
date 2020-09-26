import { Injectable } from '@angular/core';
import { DetallePedido } from '../modelos/detalle-pedido.model';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  formData: DetallePedido;
  filterData: PageAndSort;
  list: DetallePedido[];
  constructor(private http: HttpClient, private _router: Router) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "asc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
   }
   postDetallePedido() {
    return this.http.post(`${environment.apiUrl}DetallePedidos`, this.formData);
  }
  putDetallePedido() {
    return this.http.put(`${environment.apiUrl}DetallePedidos/${this.formData.Id}` , this.formData);
  }
  deleteDetallePedido(id) {
    return this.http.delete(`${environment.apiUrl}DetallePedidos/${id}`);
  }

  refreshList() {
    
    this.http.get(`${environment.apiUrl}DetallePedidos` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as DetallePedido[]);

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
