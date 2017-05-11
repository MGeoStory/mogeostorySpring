import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleControllerService {
    private url = '/api/articles';
    constructor(private http: Http) {
    }

    /**
     * get all artiles 
     * @return json
     */
    getArtiles(): Observable<any> {
        console.log('service');
        return this.http.get(this.url) // ...and calling .json() on the response to return data
            .map((res: Response) => res.json()._embedded)
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}