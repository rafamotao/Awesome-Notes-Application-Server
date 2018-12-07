import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AppMySuffix } from './app-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AppMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/apps';

    constructor(private http: Http) { }

    create(app: AppMySuffix): Observable<AppMySuffix> {
        const copy = this.convert(app);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(app: AppMySuffix): Observable<AppMySuffix> {
        const copy = this.convert(app);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AppMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to AppMySuffix.
     */
    private convertItemFromServer(json: any): AppMySuffix {
        const entity: AppMySuffix = Object.assign(new AppMySuffix(), json);
        return entity;
    }

    /**
     * Convert a AppMySuffix to a JSON which can be sent to the server.
     */
    private convert(app: AppMySuffix): AppMySuffix {
        const copy: AppMySuffix = Object.assign({}, app);
        return copy;
    }
}
