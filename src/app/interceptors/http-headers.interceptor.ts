import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const apiReq = req.clone({
            setHeaders: {
                'x-rapidapi-key': environment.apiKey,
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            },
            setParams: {
                r: 'json',
                page: '1'
            }
        });
        return next.handle(apiReq);
    }
}