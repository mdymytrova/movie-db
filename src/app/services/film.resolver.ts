import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { FilmApiDetails } from '../interface/film.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FilmResolver implements Resolve<any> {
  constructor(private apiService: ApiService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FilmApiDetails>|Promise<FilmApiDetails>|FilmApiDetails {
    return this.apiService.getFilm(route.paramMap.get('id') as string)
      .pipe(
        take(1),
        mergeMap((filmResponse: FilmApiDetails) => {
          if (filmResponse) {
            return of(filmResponse);
          } else {
            this.router.navigate(['/']);
            return EMPTY;
          }
        })
      );
  }
}