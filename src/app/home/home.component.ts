import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FilmApiBasic, FilmBasic } from '../interface/film.interface';
import { ApiListQueryParamsObject, ApiResponseList, ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public error: string | null;
  public films: Array<FilmBasic> = [];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.error = null;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['search-text']) {
        const queryParams: ApiListQueryParamsObject = {
          title: params['search-text']
        };
        if (this.activatedRoute?.snapshot?.queryParams['year']) {
          queryParams.year = this.activatedRoute?.snapshot?.queryParams['year'];
        }
        if (this.activatedRoute?.snapshot?.queryParams['type']) {
          queryParams.type = this.activatedRoute?.snapshot?.queryParams['type'];
        }
        this.fetchFilms(queryParams);
      }
    });
  }

  public onCardSelect(id: string) {
    this.router.navigate([`${id}`], {relativeTo: this.activatedRoute});
  }

  private fetchFilms(data: ApiListQueryParamsObject) {
    if (data.title) {
      this.apiService.getFilmList(data).subscribe((data: ApiResponseList<FilmApiBasic>) => {
        if (data.Response === 'True' && data.Search) {
          this.error = null;
          this.films = this.mapFilmsToView(data.Search);
        } else {
          this.error = 'No entries found.';
          this.films = [];
        }
      });
    }
  }

  private mapFilmsToView(films: FilmApiBasic[]): FilmBasic[] {
    return films.map((film: FilmApiBasic) => {
      return {
        poster: film.Poster === 'N/A' ? 'https://sncmuseum.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png' : film.Poster,
        title: film.Title,
        type: film.Type,
        year: film.Year,
        id: film.imdbID
      }
    });
  }

}
