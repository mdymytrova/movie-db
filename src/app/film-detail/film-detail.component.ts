import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmApiDetails, FilmDetails } from '../interface/film.interface';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  public film: FilmDetails = {} as FilmDetails;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Partial<{film: FilmApiDetails}>) => {
      if (data.film) {
        this.film = this.mapFilmToView(data.film);
      }
    });
  }

  public goBack() {
    this.router.navigate(['/search', `${this.activatedRoute.snapshot.params['search-text']}`]);
  }

  private mapFilmToView(film: FilmApiDetails): FilmDetails {
    return {
      poster: film.Poster === 'N/A' ? 'https://sncmuseum.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png' : film.Poster,
      title: film.Title,
      type: film.Type,
      year: film.Year,
      id: film.imdbID,
      genre: film.Genre,
      actors: film.Actors,
      country: film.Country,
      director: film.Director,
      writer: film.Writer,
      plot: film.Plot,
      runtime: film.Runtime
    }
  }

}
