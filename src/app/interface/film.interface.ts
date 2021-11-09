export interface FilmApiBasic {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface FilmApiDetails extends FilmApiBasic {
    Genre: string;
    Actors: string;
    Country: string;
    Director: string;
    Writer: string;
    Plot: string;
    Runtime: string;
    Year: string;
}

export interface FilmBasic {
    title: string;
    type: string;
    year: string;
    poster: string;
    id: string;
}
export interface FilmDetails extends FilmBasic  {
    genre: string;
    actors: string;
    country: string;
    director: string;
    writer: string;
    plot: string;
    runtime: string;
    year: string;
}
