import { DireccionService } from '../../servicios/direccion.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import { environment } from 'src/environments/environment';
import {ActivatedRoute} from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { DireccionFormComponent } from 'src/app/direcciones/direccion-form/direccion-form.component';

@Component({
  selector: 'app-direccion-cliente',
  templateUrl: './direccion-cliente.component.html',
  styles: [
  ]
})

export class DireccionClienteComponent implements OnInit {
  datos;
  
  idClienteSelect: number;
  public latLogn = {};
  mapa: mapboxgl.Map;
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  
  constructor(public service: DireccionService, private toastr: ToastrService, private _route: ActivatedRoute)
  {
  }
    static latitud: string;
    static longitud: string;
  ngOnInit(): void {
    this.resetForm();
    this.idClienteSelect = Number(localStorage.getItem('IdRef'));
    (mapboxgl.accessToken as any) = environment.accessToken;

    //inicializando el mapa
    this.mapa = new mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-64.732951, -21.531428], // starting position
      zoom: 15 // starting zoom
     });

    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.crearMarcador(this.latLogn);

    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    
  }
  crearMarcador(latitudLongitud) {
    const marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([ -64.732951, -21.531428])
    .addTo(this.mapa);

    this.mapa.on('click', function(e) {
        marker.setLngLat([e.lngLat['lng'], e.lngLat['lat']]);
        foo(e);
    }
    );
}
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
    Id: 0,
    Descripcion: '',
    Latitud: 0,
    Longitud: 0,
    Referencia: '',
    Predeterminada: false,
    IdCliente: 0
    }
  }

  onSubmit(form: NgForm) {
    this.service.formData.Latitud = Number(DireccionClienteComponent.latitud);
    this.service.formData.Longitud = Number(DireccionClienteComponent.longitud);
    if(this.service.formData.Latitud == 0 && this.service.formData.Longitud == 0)
    {
      this.service.formData.Latitud = -21.531428;
      this.service.formData.Longitud = -64.732951;
    }
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putDireccion().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Se actualizo', 'Detalles de Direccion');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    var Latitud = Number(this.service.formData.Latitud);
    var Longitud = Number(this.service.formData.Longitud);
    this.service.formData.IdCliente = this.idClienteSelect;
    this.service.formData.Latitud = Latitud;
    this.service.formData.Longitud = Longitud;
    console.log(this.service.formData);
    this.service.postDireccion().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Se guardo', 'Detalles de direccion');
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

  onDelete(id) {
    if (confirm('Estas seguro de borrar esta direccion?')) {
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
function foo(e) {
  // tslint:disable-next-line: whitespace
  DireccionClienteComponent.latitud=String(e.lngLat['lat']);
  DireccionClienteComponent.longitud = String(e.lngLat['lng']);
}