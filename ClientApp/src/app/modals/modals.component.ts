import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],
})
export class ModalsComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(public modalService: BsModalService) { }

  ngOnInit(): void {
  }
 openModal(template: TemplateRef<any>){
   this.modalRef = this.modalService.show(template);
 }
}
