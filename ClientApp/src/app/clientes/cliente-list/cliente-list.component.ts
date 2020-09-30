import { ClienteService } from '../../servicios/cliente.service'; 
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})

export class ClienteListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;

  constructor(public service: ClienteService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id) {
    if (confirm('Esta seguro de borrar el cliente?')) {
      this.service.deleteCliente(id)
        .subscribe(res => {
          this.service.refreshList();
        },
          err => { console.log(err); })
    }
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.filterData.Columna = column;
    this.service.filterData.Direccion = direction;
    this.service.refreshList();
  }

  filtrar(filtro) {
    this.service.filtrar(filtro);
  }

  listar(cantidad) {
    this.service.listar(cantidad);
  }

  Anterior(){
    this.service.Anterior();
  }

  Siguiente(){
    this.service.Siguiente();
  }
}