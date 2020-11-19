import { ClienteService } from '../../servicios/cliente.service'; 
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-perfil-cliente-list',
  templateUrl: './perfil-cliente-list.component.html',
  styles: [
  ]
})
export class PerfilClienteListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;

  constructor(public service: ClienteService) { }

  ngOnInit(): void {
    this.llamarDatos();
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  idCli:number=0;
  llamarDatos(){
    this.idCli = parseInt(localStorage.getItem('IdRef'));
  }
}
