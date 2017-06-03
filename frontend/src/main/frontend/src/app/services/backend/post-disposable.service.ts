import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostDisposableService {
    private baseUrl: string = '/api/v1/disposable';
    constructor(private http: Http) {
    }

    getPostDisposableByYear(year: number): Observable<Object[]> {
        return this.http.get(`${this.baseUrl}/${year}`)
            .map((res: Response) => {
                console.log(res.json());
                return res.json();
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPostDisposableByYearAndCityId(year: number, cityId: string): Observable<Object[]> {
        return this.http.get(`${this.baseUrl}/${year}/city/${cityId}`)
            .map((res: Response) => {
                console.log(res.json());
                return res.json();
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}