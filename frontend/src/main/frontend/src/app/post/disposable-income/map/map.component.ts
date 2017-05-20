import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LMapSettingService } from 'app/services/frontend/lmap-setting.service';
import { ObservableService } from 'app/services/frontend/observable.service';
import * as d3 from 'd3';
import * as L from 'leaflet';


const MAP_ID: string = 'lmap';
const GEOJSON_DATA: string = 'assets/geodata/county_tw-ms.json';
const mc: MapComponent = this;
let map: L.Map;
let layersOfCounty: L.GeoJSON;

@Component({
  selector: 'post-disposable-income-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  encapsulation: ViewEncapsulation.None //no shoadow DOM.
})

export class MapComponent implements OnInit {
  // map: L.Map;
  // private layersOfCounty: L.GeoJSON;


  constructor(private lms: LMapSettingService, private os: ObservableService) {
  }

  ngOnInit() {
    d3.select('#leaf-map').attr('id', MAP_ID);
    map = this.lms.initMap(MAP_ID);
    map.addControl(this.lms.addIconOfResetControll()).on('click', this.resetControl);
    this.os.observedNumber.subscribe(
      (number: number[]) => {
        console.log(number);
      }
    );

    this.mappingTaiwanByCounty();
  }
  resetControl() {
    console.log("resetControl");
    console.log(typeof map);
    map.fitBounds(layersOfCounty.getBounds());
  }

  mappingTaiwanByCounty(): void {
    console.log("mappingTaiwanByCounty");
    d3.json(GEOJSON_DATA, function (data) {
      console.log(data);

      layersOfCounty = L.geoJSON(data, {
        style: (feature) => {
          return { color: 'red' }
        }
      }).addTo(map);

      layersOfCounty.setStyle(() => {
        return { color: 'grey' }
      });

      layersOfCounty.eachLayer((layer) => {
        // layer.bindPopup('hello');
        // layer.bindTooltip('111');
      }).on({
        click: function (e) {
          console.log('clicked');
          console.log(e);
        }
      });

      map.fitBounds(layersOfCounty.getBounds());
    });
  }
}//.. MapComponent

