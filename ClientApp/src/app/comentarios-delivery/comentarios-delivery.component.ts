import { Component, OnInit,ViewChildren, QueryList } from '@angular/core';
import { TransportadorService } from '../servicios/transportador.service';
import { SortColumns, SortEvent } from '../../app/directivas/sortcolumns';
import {NgbModal} from'@ng-bootstrap/ng-bootstrap';
import { Calificacion } from '../modelos/calificacion.model';
import { CalificacionService } from '../servicios/calificacion.service';
@Component({
  selector: 'app-comentarios-delivery',
  templateUrl: './comentarios-delivery.component.html',
  styles: [
  ]
})
export class ComentariosDeliveryComponent implements OnInit {
  list: Calificacion[];
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: TransportadorService,private modal:NgbModal,public servicecomentarios: CalificacionService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  listarComentarios(id)
  {
    this.servicecomentarios.ObtenerComentarios(id).subscribe(
      comentarios=>{
        this.list=comentarios as any;
      }
    );
      console.log(this.list);
  }
  openSM(contenido,id){
    this.modal.open(contenido,{size:'xl'});
    this.listarComentarios(id);
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
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
