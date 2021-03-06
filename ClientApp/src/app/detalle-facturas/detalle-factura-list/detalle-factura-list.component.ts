import { Component, OnInit, ViewChildren, QueryList  } from '@angular/core';
import { DetalleFacturaService} from '../../servicios/detalle-factura.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-detalle-factura-list',
  templateUrl: './detalle-factura-list.component.html',
  styles: ['./detalle-factura-list.component.css'] 
})
export class DetalleFacturaListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: DetalleFacturaService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteDetalleFactura(id)
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
