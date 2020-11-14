import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.initializeMap();
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
