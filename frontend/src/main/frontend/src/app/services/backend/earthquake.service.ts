import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * get data from com.mgstory.controller.ArticlesController
 */
@Injectable()
export class EarthquakeService {
    private url = '/api/v1/earthquakes';
    constructor(private http: Http) {
    }


    getEarthquakeById(id: number): Observable<Object> {
        return this.http.get(`${this.url}/${id}`).
            map((res: Response) => {
                return res.json();
            })
    }

    getEarthquakeGById(id: number): Observable<Object> {
        return this.http.get(`${this.url}/geo/${id}`).
            map((res: Response) => {
                return res.json();
            })
    }

    getArticleById(id: number): Observable<Object> {
        return this.http.get(`${this.url}/${id}`).
            map((res: Response) => {
                return res.json();
            })
    }

}