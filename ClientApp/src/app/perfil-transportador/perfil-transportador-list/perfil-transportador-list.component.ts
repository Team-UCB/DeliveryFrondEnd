import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { TransportadorService } from '../../servicios/transportador.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-perfil-transportador-list',
  templateUrl: './perfil-transportador-list.component.html',
  styles: [
  ]
})
export class PerfilTransportadorListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: TransportadorService) { }

  ngOnInit(): void {
    this.llamarDatos();
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  idTrans:number=0;
  llamarDatos(){
    // tslint:disable-next-line: radix
    this.idTrans = parseInt(localStorage.getItem('IdRef'));
  }

}
