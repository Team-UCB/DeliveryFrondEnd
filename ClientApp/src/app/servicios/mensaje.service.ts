import { Mensaje } from '../modelos/mensaje.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Chat } from '../modelos/chat.model';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  formData: Mensaje;
  filterData: PageAndSort;
  list: Mensaje[];
  //agregar lista de producto para la llave foranea
  listChat: Chat[];
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
  listChats() {
    
    this.http.get(`${environment.apiUrl}Chats` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.listChat = (res as any).Datos as Chat[]);

      console.log(this.list);
  }


  postMensaje() {
    return this.http.post(`${environment.apiUrl}Mensajes`, this.formData);
  }
  putMensaje() {
    return this.http.put(`${environment.apiUrl}Mensajes/${this.formData.Id}` , this.formData);
  }
  deleteMensaje(id) {
    return this.http.delete(`${environment.apiUrl}Mensajes/${id}`);
  }

  refreshList() {
    
    this.http.get(`${environment.apiUrl}Mensajes` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Mensaje[]);

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