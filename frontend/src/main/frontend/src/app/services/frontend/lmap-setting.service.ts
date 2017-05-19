import * as L from 'leaflet';

//
export class LMapSettingService {
    private mapboxTileLayer: L.TileLayer;
    private mapboxUrl: string;
    private mapboxAttribution: string;

    /**
     * init base Map from mapbox-dark-v9
     * @param id 
     */
    initMap(id: string): L.Map {
        let map: L.Map = L.map(id).setView([25.083, 121.391], 15);
        map.addLayer(this.basedMap());
        return map;
    }

    /**
     * create icon of ResetControll only.
     * CSS is needed.
     * encapsulation: ViewEncapsulation.None is needed.
     */
    addIconOfResetControll(): L.Control {
        let resetControl = L.control.attribution({ position: 'bottomleft' });
        let divOfResetControl: HTMLElement;
        resetControl.onAdd = () => {
            divOfResetControl = L.DomUtil.create('div');
            divOfResetControl.className = 'resetControl';
            divOfResetControl.innerHTML = '<span class="glyphicon glyphicon-refresh resetControl"></span>';
            return divOfResetControl;
        }
        return resetControl;
    }

    /**
     * basemap from mapboxUrl
     */
    basedMap(): L.TileLayer {
        console.log("basemap");
        this.mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlsZXN3YW5nIiwiYSI6ImNpeGl2NDF1ejAwMTAycWw4cDhoanViaGMifQ.nwPu50GsqxfjSc1t7EsVZA';
        this.mapboxAttribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

        //setting scale bar, compass and other base components 
        this.mapboxTileLayer = L.tileLayer(this.mapboxUrl, {
            // attribution: this.mapboxAttribution,
        });

        return this.mapboxTileLayer;
    }
}