import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as d3 from 'd3';

@Injectable()
export class ArticleControllerService {
    private url = '/api/articles';
    constructor(private http: Http) {
    }

    /**
     * get all artiles 
     * @return javascript's object
     */
    getArtiles(): Observable<Array<Object>> {
        return this.http.get(this.url) // ...and calling .json() on the response to return a array[boject]
            .map((res: Response) => {
                // console.log(res.json()._embedded.articles);
                // console.log(typeof res.json()._embedded.articles);

                // var articles: Array<Object> =[];
                // res.json()._embedded.articles.forEach(element => {
                //     console.log(element);
                //     articles.push(element);
                // });
                // console.log(articles);
                // console.log(res.json()._embedded.articles);
                return res.json()._embedded.articles;
            })
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}