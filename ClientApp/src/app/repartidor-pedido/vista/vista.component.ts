import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import { TransportadorService } from '../../servicios/transportador.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styles: [
  ]
})
export class VistaComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: PedidoService, public service1: TransportadorService) { }

  ngOnInit(): void {
    this.service.filterData.Direccion="desc";
    this.service.refreshList();
    this.service1.llamarTransportador();

    
  }
  
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  verUbicacion(id) {
    
    this.initializeMap();
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

  private initializeMap() {
    /// locate the user
    mapboxgl.accessToken = "pk.eyJ1IjoicG9sbG9tb24iLCJhIjoiY2toZ2xvZHliMTFubTJzb3Jldm5zbTVmdiJ9.4l8sE2V55-Zo_ytMdcAZFQ";

    /* Map: This represents the map on the page. */
    var map = new mapboxgl.Map({
     container: "map",
     style: "mapbox://styles/mapbox/dark-v10",
     zoom: 16,
     center: [-64.7295,-21.5108]
    });
  
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
  
    map.on("load", function () {
     /* Image: An image is loaded and added to the map. */
     map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
         if (error) throw error;
         map.addImage("custom-marker", image);
         /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
         map.addLayer({
           id: "markers",
           type: "symbol",
           /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
           source: {
             type: "geojson",
             data: {
               type: 'FeatureCollection',
               features: [
                 {
                   type: 'Feature',
                   properties: {},
                   geometry: {
                     type: "Point",
                     coordinates: [-64.7295,-21.5108]
                   }
                 }
               ]
             }
           },
           layout: {
             "icon-image": "custom-marker",
           }
         });
       });
    });
  }
}