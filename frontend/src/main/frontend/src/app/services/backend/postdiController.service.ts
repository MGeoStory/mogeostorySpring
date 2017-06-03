import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostDiControllerService {
    private baseUrl: string = '/api';
    private searchUrl: string = this.baseUrl + "/postdi/search";
    constructor(private http: Http) {
    }

    /**
     * get all post di and sort by id(key)
     * @return javascript's object
     */
    getPostDis(): Observable<Array<Object>> {
        return this.http.get(this.baseUrl + "/postdi?sort=id") // ...and calling .json() on the response to return a array[boject]
            .map((res: Response) => {
                // console.log(articles);
                // console.log(res.json()._embedded.articles);
                return res.json()._embedded.postdi;
            })
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * get post di by year
     * @param year 
     */
    getPostDiByYear(year: number): Observable<Object[]> {
        return this.http.get(this.searchUrl + "/year?y=" + year)
            .map((res: Response) => {
                return res.json()._embedded.postdi;
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}