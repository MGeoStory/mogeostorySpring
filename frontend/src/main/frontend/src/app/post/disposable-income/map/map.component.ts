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
let valueOfFeatures: d3.Map<{}> = d3.map();
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
      (dbData: d3.Map<{}>[]) => {
        //use a if to avoid async error caused by mappingTwiwanByCOunty(d3) and subscribe. 
        if (isFirstLoading) {
          console.log(dbData);
          valueOfFeatures = this.simplifiedDbData(dbData);
          colorizeFeatures = this.linearColorize(valueOfFeatures);
          this.mappingTaiwanByCounty(valueOfFeatures);
          isFirstLoading = false;
        } else {
          valueOfFeatures = this.simplifiedDbData(dbData);
          this.resetLayersStyle(valueOfFeatures);
        }
      }
    );

    //it's BUG, but it's good for user experience.
    map.addControl(this.lms.addIconOfResetControll()).on('click', this.resetControl);
  }

  /**
   * simplefiedDbData to d3.map {{key=countyid, value=value }}
   * @param dbData 
   */
  simplifiedDbData(dbData: d3.Map<{}>[]) {
    let vof: d3.Map<{}> = d3.map();
    for (let key in dbData[0]) {
      if (key != 'twall' && key != 'year' && key != '_links') {
        // console.log(key);
        // console.log(dbData[0][key]);
        vof.set(key.toUpperCase(), dbData[0][key]);
      }
    }
    return vof;
  }
  /**
   * use d3.extent and d3.scaleLinear to produce a colorize tool for features by value of each feature.
   */
  linearColorize(valueOfFeatures: d3.Map<{}>) {
    let values: number[] = [];
    valueOfFeatures.each((value, key) => {
      //use plus(+) to transit type {} to number, i dont know why...
      values.push(+value);
    })
    return d3.scaleLinear<string>()
      .domain(d3.extent(values))
      .range(["#FFEDA0", "#800026"]);
  }

  /**
   * reset the color of feature and dont need render the geoJson
   * @param dbData 
   */
  resetLayersStyle(valueOfFeatures: d3.Map<{}>) {
    layersOfCounty.setStyle((feature) => {
      return { fillColor: this.getFillColor(feature.properties["COUNTYID"], valueOfFeatures) }
    });
  }

  /**
   * mapping Taiwan By county only once that user entre page in first time.
   */
  mappingTaiwanByCounty(valueOfFeatures: d3.Map<{}>): void {
    console.log("mappingTaiwanByCounty");
    d3.json(GEOJSON_DATA, (geoData) => {
      layersOfCounty = L.geoJSON(geoData, {
        style: (feature) => {
          return {
            fillColor: this.getFillColor(feature.properties["COUNTYID"], valueOfFeatures),
            fillOpacity: 0.9,
            color: 'gray',
            dashArray: '3',
            weight: 1.5
          }
        }, onEachFeature: function (feature, layer) {
          layer.on({
            click: function (e) {
              console.log(feature.properties);
            }
          });//.layer.on
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
  getFillColor(countyId: string, valueOfFeatures: d3.Map<{}>) {
    let valueOfCountry: number;
    // console.log(valueOfFeatures);
    if (valueOfFeatures.get(countyId) != null) {
      valueOfCountry = +valueOfFeatures.get(countyId);
      return colorizeFeatures(valueOfCountry);
    } else {
      // valueOfCountry = 0;
      return ('LightGrey');
    }
  }//.. getFillColor

  /**
   * zoom to bounds that contain geojson
   */
  resetControl() {
    // console.log("resetControl");
    map.fitBounds(layersOfCounty.getBounds());
  }//.. resetControl
}//.. MapComponent

