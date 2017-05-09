import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GetBackDataService {
    // private url = 'https://test2-25905.firebaseio.com/heros.json';  // URL to web API
    private url = '/api/article';
    private headers: Headers = new Headers();
    constructor(private http: Http) {
        // this.headers.append('Content-Type', 'application/json');
    }
    getData(): Observable<any> {
        console.log('service');
        console.log(this.url);
        // console.log(this.http.get(this.url));
        return this.http.get(this.url) // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}