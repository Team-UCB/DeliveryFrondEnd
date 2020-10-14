import { Usuario } from '../modelos/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Rol } from '../modelos/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  formData: Usuario;
  filterData: PageAndSort;
  list: Usuario[];


  listRol: Rol[];
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
  
  postUsuario() {
    console.log(this.formData);
    return this.http.post(`${environment.apiUrl}Usuarios`, this.formData);
  }
  putUsuario() {
    return this.http.put(`${environment.apiUrl}Usuarios/${this.formData.Id}`, this.formData);
  }
  deleteUsuario(id) {
    return this.http.delete(`${environment.apiUrl}Usuarios/${id}`);
  }

  authUsuarios(nombre, clave){
    return this.http.get(`${environment.apiUrl}Usuarios/${nombre}/${clave}`);
  }

  refreshList() {
    this.http.get(`${environment.apiUrl}Usuarios` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Usuario[]);
  }



  listRoles() {
    this.http.get(`${environment.apiUrl}Roles` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listRol = (res as any).Datos as Rol[]);
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

  loggedIn(){
    return !!localStorage.getItem('UserId');
  }

  getUserId(){
    return localStorage.getItem('UserId');
  }
  logoutUser(){
      localStorage.removeItem('UserId');
      this._router.navigate(['/inicio']);
 }

 getToken(){
   return localStorage.getItem('Token');
  }
  

}