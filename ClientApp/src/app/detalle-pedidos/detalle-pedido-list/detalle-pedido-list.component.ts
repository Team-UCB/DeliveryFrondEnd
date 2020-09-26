import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DetallePedidoService} from '../../servicios/detalle-pedido.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-detalle-pedido-list',
  templateUrl: './detalle-pedido-list.component.html',
  styles: [
  ]
}) 
export class DetallePedidoListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: DetallePedidoService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteDetallePedido(id)
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
    // resetting other headers
    this.service.filtrar(filtro);
  }
  listar(cantidad) {
    // resetting other headers
    this.service.listar(cantidad);
  }

  Anterior(){
    this.service.Anterior();
  }
  Siguiente(){
    this.service.Siguiente();
  }

}
