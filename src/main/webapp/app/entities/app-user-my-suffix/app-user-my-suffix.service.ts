import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AppUserMySuffix } from './app-user-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AppUserMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/app-users';

    constructor(private http: Http) { }

    create(appUser: AppUserMySuffix): Observable<AppUserMySuffix> {
        const copy = this.convert(appUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(appUser: AppUserMySuffix): Observable<AppUserMySuffix> {
        const copy = this.convert(appUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AppUserMySuffix> {
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
     * Convert a returned JSON object to AppUserMySuffix.
     */
    private convertItemFromServer(json: any): AppUserMySuffix {
        const entity: AppUserMySuffix = Object.assign(new AppUserMySuffix(), json);
        return entity;
    }

    /**
     * Convert a AppUserMySuffix to a JSON which can be sent to the server.
     */
    private convert(appUser: AppUserMySuffix): AppUserMySuffix {
        const copy: AppUserMySuffix = Object.assign({}, appUser);
        return copy;
    }
}
