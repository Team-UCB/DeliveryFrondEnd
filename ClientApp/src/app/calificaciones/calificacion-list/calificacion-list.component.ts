import { CalificacionService } from '../../servicios/calificacion.service'; 
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-calificacion-list',
  templateUrl: './calificacion-list.component.html',
  styleUrls: []
})

export class CalificacionListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;

  constructor(public service: CalificacionService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id) {
    if (confirm('Esta seguro de borrar el calificacion?')) {
      this.service.deleteCalificacion(id)
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
