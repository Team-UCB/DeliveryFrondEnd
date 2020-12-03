import { Component, OnInit, ViewChildren, QueryList  } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import { ChatService } from '../../servicios/chat.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import { ToastrService } from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Chat } from 'src/app/modelos/chat.model';
@Component({
  selector: 'app-vista-cp',
  templateUrl: './vista-cp.component.html',
  styles: [
  ]
})
export class VistaCPComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: PedidoService, private toastr: ToastrService, private modal:NgbModal, public serviceChat: ChatService) { }

  ngOnInit(): void {
    this.serviceChat.refreshList();
    this.resetForm();
    this.llamarDatos();
    this.service.listarEstados("Preparacion");
  }
  resetForm() {
    this.serviceChat.formData = {
      Id: 0,
      IdOrigen:0,
      IdDestino: 0,
      Text:'',
      Estado:''
    }
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }
  ObjListaPedidoCan(obj) {
    this.service.formDataListaPedidos = Object.assign({}, obj);
    this.service.formDataListaPedidos.Estado = "Cancelado";
    this.cancelarPedido(this.service.formDataListaPedidos.Id);
  }
  ObjListaPedidoAcep(obj) {
    this.service.formDataListaPedidos = Object.assign({}, obj);
    this.service.formDataListaPedidos.Estado = "Preparacion";
    this.aceptarPedido(this.service.formDataListaPedidos.Id);
  }

  cancelarPedido(id) {
    this.service.formData = this.service.formDataListaPedidos;
    this.service.putPedido().subscribe(
      res => {
        this.toastr.info('Cancelando', 'Pedido');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  aceptarPedido(id) {
    this.service.formData = this.service.formDataListaPedidos;
    this.service.putPedido().subscribe(
      res => {
        this.toastr.info('Procesando', 'Pedido');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
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
    this.service.listarEstados(cantidad);
  }

  Anterior(){
    this.service.Anterior();
  }
  Siguiente(){
    this.service.Siguiente();
  }

  idVen:number=0;
  llamarDatos(){
    this.idVen = parseInt(localStorage.getItem('IdRef'));
  }

  visible:number=0;
  visibility(vis){
    this.visible=vis;
    console.log("hola");
  }

  //funcionalida de chat
  listaChats:Chat[];
  open(contenido,idDest){
    this.serviceChat.formData.IdDestino=idDest;
    this.serviceChat.formData.IdOrigen=parseInt(localStorage.getItem('IdRef'));
    this.serviceChat.traerChats(parseInt(localStorage.getItem('IdRef')),idDest).subscribe(
      res => {
      this.listaChats=((res as any));
    },
    err => {
      console.log(err);
        }
    );
    this.modal.open(contenido,{scrollable:true});
  }

  mostrar(){
    this.serviceChat.traerChats(parseInt(localStorage.getItem('IdRef')),this.serviceChat.formData.IdDestino).subscribe(
      res => {
      this.listaChats=((res as any));
    },
    err => {
      console.log(err);
        }
    );
  }

  insertChat() {
    this.serviceChat.formData.Text="Cliente: " + this.serviceChat.formData.Text;
    this.serviceChat.formData.Estado="Espera";
    this.serviceChat.postChat().subscribe(
      res => {
        this.serviceChat.refreshList();
        this.mostrar();
        this.resetForm();
      },
      err => { console.log(err); }
    )
  }
}
