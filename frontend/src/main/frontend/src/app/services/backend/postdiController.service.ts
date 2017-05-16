import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PostDiControllerService {
    private apiUrl : string = '/api';
    constructor(private http: Http) {
    }

    /**
     * get all post di and sort by id(key)
     * @return javascript's object
     */
    getPostDis(): Observable<Array<Object>> {
        return this.http.get(this.apiUrl+"/postdi?sort=id") // ...and calling .json() on the response to return a array[boject]
            .map((res: Response) => {
                // console.log(articles);
                // console.log(res.json()._embedded.articles);

                return res.json()._embedded.postdi;
            })
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}