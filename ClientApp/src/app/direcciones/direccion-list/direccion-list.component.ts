import { DireccionService } from '../../servicios/direccion.service'; 
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-direccion-list',
  templateUrl: './direccion-list.component.html',
  styleUrls: []
})

export class DireccionListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;

  constructor(public service: DireccionService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id) {
    if (confirm('Esta seguro de borrar la direccion?')) {
      this.service.deleteDireccion(id)
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
    //REVISAR SI ES DIRECCION O DIRECTION
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