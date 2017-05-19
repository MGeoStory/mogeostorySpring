import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LMapSettingService } from 'app/services/frontend/lmap-setting.service';
import { ObservableService } from 'app/services/frontend/observable.service';
import * as d3 from 'd3';
import * as L from 'leaflet';


const MAP_ID: string = 'lmap';

@Component({
  selector: 'post-disposable-income-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  encapsulation: ViewEncapsulation.None //no shoadow DOM.
})

export class MapComponent implements OnInit {
  private map: L.Map;

  constructor(private lms: LMapSettingService, private os: ObservableService) {
  }

  ngOnInit() {
    d3.select('#leaf-map').attr('id', MAP_ID);
    this.map = this.lms.initMap(MAP_ID);
    this.map.addControl(this.lms.addIconOfResetControll()).on('click', this.resetControl);

    this.os.observedNumber.subscribe(
      (number: number[]) => {
        console.log(number);
      }
    );
  }
  resetControl() {
    console.log("resetControl");
    // this.map.fitBounds(layerOfGeoJSON.getBounds());
  }
}
