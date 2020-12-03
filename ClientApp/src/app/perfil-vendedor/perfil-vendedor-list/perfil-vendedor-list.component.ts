import { Component, OnInit, Query, QueryList, ViewChild, ViewChildren  } from '@angular/core';
import { VendedorService } from '../../servicios/vendedor.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-perfil-vendedor-list',
  templateUrl: './perfil-vendedor-list.component.html',
  styles: [
  ]
})
export class PerfilVendedorListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: VendedorService) { }

  ngOnInit(): void {
    this.llamarDatos();
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    //
    this.service.cardImageBase64 = this.service.formData.PathLogo;
  }
  idVen:number=0;
  llamarDatos(){
    // tslint:disable-next-line: radix
    this.idVen = parseInt(localStorage.getItem('IdRef'));
  }
}
