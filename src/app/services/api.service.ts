import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilmApiBasic, FilmApiDetails, FilmBasic } from '../interface/film.interface';

export interface ApiResponseList<T> {
  Response: string;
  Search?: T[];
  totalResults?: string;
  Error?: string;
}

export interface ApiListQueryParamsObject {
  title: string | null;
  year?: string | null;
  type?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public getFilmList(queryParams: ApiListQueryParamsObject): Observable<ApiResponseList<FilmApiBasic>> {
    const paramsObject = {s: queryParams.title } as any;
    if (queryParams.year) {
      paramsObject.y =  queryParams.year;
    }
    if (queryParams.type) {
      paramsObject.type =  queryParams.type;
    }
    let params = new HttpParams({ fromObject: paramsObject });
    return this.http.get<ApiResponseList<FilmApiBasic>>(`${environment.baseUrl}`, {params});
  }

  public getFilm(id: string): Observable<FilmApiDetails> {
    let params = new HttpParams().set('i', id);
    return this.http.get<FilmApiDetails>(`${environment.baseUrl}`, {params});
  }
}
