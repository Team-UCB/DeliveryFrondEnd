import { Injectable } from '@angular/core';
import { DetalleFactura } from '../modelos/detalle-factura.model';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
  formData: DetalleFactura;
  filterData: PageAndSort;
  list: DetalleFactura[];
  constructor(private http: HttpClient, private _router: Router) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "asc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
   }
   postDetalleFactura() {
    return this.http.post(`${environment.apiUrl}DetalleFacturas`, this.formData);
  }
  putDetalleFactura() {
    return this.http.put(`${environment.apiUrl}DetalleFacturas/${this.formData.Id}` , this.formData);
  }
  deleteDetalleFactura(id) {
    return this.http.delete(`${environment.apiUrl}DetalleFacturas/${id}`);
  }

  refreshList() {
    
    this.http.get(`${environment.apiUrl}DetalleFacturas` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as DetalleFactura[]);

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
 