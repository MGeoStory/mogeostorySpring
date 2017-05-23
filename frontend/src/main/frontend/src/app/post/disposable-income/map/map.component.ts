import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LMapSettingService } from 'app/services/frontend/lmap-setting.service';
import { ObservableService } from 'app/services/frontend/observable.service';
import * as d3 from 'd3';
import * as L from 'leaflet';


const MAP_ID: string = 'lmap';
const GEOJSON_DATA: string = 'assets/geodata/county_tw-ms.json';
let map: L.Map;
let layersOfCounty: L.GeoJSON;
let isFirstLoading: boolean = true;
let colorizeFeatures: d3.ScaleLinear<any, any>;

@Component({
  selector: 'post-disposable-income-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  encapsulation: ViewEncapsulation.None //no shoadow DOM.
})

export class MapComponent implements OnInit {
  constructor(private lms: LMapSettingService, private os: ObservableService) {
  }

  ngOnInit() {
    d3.select('#leaf-map').attr('id', MAP_ID);
    map = this.lms.initMap(MAP_ID);
    console.log(isFirstLoading);
    this.os.observedData.subscribe(
      (dbData: Object[]) => {
        //use a if to avoid async error caused by mappingTwiwanByCOunty(d3) and subscribe. 
        if (isFirstLoading) {
          colorizeFeatures = this.linearColorize(dbData);
          this.mappingTaiwanByCounty(dbData);
          isFirstLoading = false;
        } else {
          this.resetLayersStyle(dbData);

        }
      }
    );
    map.addControl(this.lms.addIconOfResetControll()).on('click', this.resetControl);
  }

  /**
   * use d3.extent and d3.scaleLinear to produce a colorize tool for features by value of each feature.
   */
  linearColorize(dbData: Object[]) {
    let values: number[] = [];
    for (let a in dbData[0]) {
      if (a != 'twall' && a != 'year' && a != '_links') {
        // console.log(data[0]);
        values.push(dbData[0][a]);
      }
    }
    return d3.scaleLinear<string>()
      .domain(d3.extent(values))
      .range(["#FFEDA0", "#800026"]);
  }

  /**
   * reset the color of feature and dont need render the geoJson
   * @param dbData 
   */
  resetLayersStyle(dbData: Object[]) {
    layersOfCounty.setStyle((feature) => {
      return { fillColor: this.getFillColor(feature.properties["COUNTYID"], dbData) }
    });
  }

  /**
   * mapping Taiwan By county only once that user entre page in first time.
   */
  mappingTaiwanByCounty(dbData: Object[]): void {
    console.log("mappingTaiwanByCounty");
    d3.json(GEOJSON_DATA, (geoData) => {
      layersOfCounty = L.geoJSON(geoData, {
        style: (feature) => {
          // console.log(feature.properties["COUNTYID"]);
          return {
            fillColor: this.getFillColor(feature.properties["COUNTYID"], dbData),
            fillOpacity: 0.9,
            color: 'gray',
            dashArray: '3',
            weight: 1.5
          }
        }
      }).addTo(map);

      // this.setEachLayers(layersOfCounty, dbData);
      map.fitBounds(layersOfCounty.getBounds());
    });

  }// .. mappingTaiwanByCounty


  /**
   * get the filled color by id of geojson and value from database
   * @param countyId 
   * @param dbData 
   */
  getFillColor(countyId: string, dbData: Object[]) {
    // console.log(countyId);
    // console.log(dbData[0][countyId.toLowerCase()]);
    let valueOfCountry: number;
    if (dbData[0][countyId.toLowerCase()] != null) {
      valueOfCountry = dbData[0][countyId.toLowerCase()];
      return colorizeFeatures(valueOfCountry);
      // val colorizeFeatures(valueOfCountry);
    } else {
      // valueOfCountry = 0;
      return ('LightGrey');
    }
  }

  /**
   * zoom to bounds that contain geojson
   */
  resetControl() {
    console.log("resetControl");
    console.log(typeof map);
    map.fitBounds(layersOfCounty.getBounds());
  }
}//.. MapComponent

