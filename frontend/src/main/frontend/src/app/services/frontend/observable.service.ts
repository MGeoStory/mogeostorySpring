import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as d3 from 'd3';
import * as L from 'leaflet';

@Injectable()
export class ObservableService {

    private subjectDataAndTime = new Subject<Map<string, any>>();

    private subjectString = new Subject<String[]>();
    private subjectNumber = new Subject<Number[]>();
    private subjectData = new Subject<Object[]>();
    private subjectAny = new Subject<any[]>();
    private subjectGeoLayer = new Subject<L.GeoJSON>();


    observedDataAndTime = this.subjectDataAndTime.asObservable();
    observedString = this.subjectString.asObservable();
    observedNumber = this.subjectNumber.asObservable();
    observedData = this.subjectData.asObservable();
    observedAny = this.subjectAny.asObservable();
    observedGeoLayer = this.subjectGeoLayer.asObservable();


    pushGeoLayer(geoLayer:L.GeoJSON){
        this.subjectGeoLayer.next(geoLayer);
    }


    /**
     * data:object[], time:number[]
     * @param dataAndTime 
     */
    pushDataAndTime(dataAndTime: Map<string, any>) {
        this.subjectDataAndTime.next(dataAndTime);
    }
    /**
     * push Object
     * @param data
     */
    pushDataToObserved(data: Object[]) {
        this.subjectData.next(data);
    };
    /**
     * push string
     * @param data 
     */
    pushStringToObserved(data: String[]) {
        this.subjectString.next(data);
    }

    /**
     * push number
     * @param data 
     */
    pushNumberToObserved(data: Number[]) {
        this.subjectNumber.next(data);
    }

    /**
     * push any you want
     * @param data 
     */
    pushAnyToObserved(data: any[]) {
        this.subjectAny.next(data);
    }

    //////////////////////////////////
    //below variables and function are used in post/receipt, and need to refactoring in one day.
    //////////////////////////////////
    // Observable string sources
    private refMapClickedSource = new Subject<string>();
    private refTimeSource = new Subject<Array<string>>();

    //when perpare dropdwonlist, set data formatted
    private refDataSource = new Subject<Array<Object>>();

    // Observable string streams
    refId = this.refMapClickedSource.asObservable();
    refTime = this.refTimeSource.asObservable();
    refData = this.refDataSource.asObservable();

    // dropdown list of years
    announceRefTime(refTime: Array<string>) {
        this.refTimeSource.next(refTime);
    }
    confirmRefTime(refTime: Array<string>) {
        this.refTimeSource.next(refTime);
    }

    //data formatted
    announceRefData(refData: Array<Object>) {
        // console.log("announceRefData");
        this.refDataSource.next(refData);
    }
    // confirmRefData(refData: Array<Object>) {
    //     this.refDataSource.next(refData);
    // }

    // Service message commands
    announceRefId(refCountry: string) {
        this.refMapClickedSource.next(refCountry);
    }

    confirmRefId(refCountry: string) {
        this.refMapClickedSource.next(refCountry);
    }


}// END OF MapGraphService