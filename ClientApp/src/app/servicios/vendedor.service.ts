import { Vendedor } from '../modelos/vendedor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  formData: Vendedor;
  filterData: PageAndSort;
  //readonly rootURL = 'http://perezleonardo.somee.com/api';
  list: Vendedor[];
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
  postVendedor() {
    return this.http.post(`${environment.apiUrl}vendedores`, this.formData);
  }
  putVendedor() {
    return this.http.put(`${environment.apiUrl}vendedores/${this.formData.Id}`, this.formData);
  }
  deleteVendedor(id) {
    return this.http.delete(`${environment.apiUrl}vendedores/${id}`);
  }

  refreshList() {
    this.http.get(`${environment.apiUrl}vendedores` + '?columna=' + this.filterData.Columna +
    '&direccion=' + this.filterData.Direccion +
    '&Pagina=' + this.filterData.Pagina +
    '&TamPagina=' + this.filterData.TamPagina +
    '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Vendedor[]);
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
      this.filterData.Pagina= this.filterData.Pagina-1;
      this.refreshList();
      }
  
    Siguiente() {
        this.filterData.Pagina=this.filterData.Pagina+1;
        this.refreshList();
      }
}
