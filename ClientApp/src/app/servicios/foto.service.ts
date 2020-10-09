import { Injectable } from '@angular/core';
import { Foto } from '../modelos/foto.model';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Producto } from '../modelos/producto.model';
@Injectable({
  providedIn: 'root'
})
export class FotoService {
  formData: Foto;
  filterData: PageAndSort;
  //readonly rootURL = 'http://perezleonardo.somee.com/api';
  list: Foto[];
  //agregar lista de producto para la llave foranea
  listProducto: Producto[];
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
   listProductos() {
    
    this.http.get(`${environment.apiUrl}Productos` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listProducto = (res as any).Datos as Producto[]);

      console.log(this.list);
  }
  postFotos() {
    return this.http.post(`${environment.apiUrl}Fotos`, this.formData);
  }
  putFotos() {
    return this.http.put(`${environment.apiUrl}Fotos/${this.formData.Id}`, this.formData);
  }
  deleteFotos(id) {
    return this.http.delete(`${environment.apiUrl}Fotos/${id}`);
  }

  refreshList() {
    this.http.get(`${environment.apiUrl}Fotos` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Foto[]);
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