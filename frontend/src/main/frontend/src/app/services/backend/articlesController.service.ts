import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as d3 from 'd3';

/**
 * get data from com.mgstory.controller.ArticlesController
 */
@Injectable()
export class ArticleControllerService {
    private url = '/api/v1/articles';
    constructor(private http: Http) {
    }

    /**
     * get all artiles and sort by id(key)
     * @return javascript's object
     */
    getArtiles(): Observable<Array<Object>> {
        return this.http.get(this.url + "/sortbyid") // ...and calling .json() on the response to return a array[boject]
            .map((res: Response) => {
                // console.log(typeof res.json()._embedded.articles);

                // var articles: Array<Object> =[];
                // res.json()._embedded.articles.forEach(element => {
                //     console.log(element);
                //     articles.push(element);
                // });
                // console.log(articles);
                // console.log(res.json()._embedded.articles);
                return res.json();
            })
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getArticleById(id: number): Observable<Object> {
        return this.http.get(`${this.url}/${id}`).
            map((res:Response)=>{
                return res.json();
        })
    }

}