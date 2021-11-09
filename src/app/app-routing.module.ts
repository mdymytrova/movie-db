import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { HomeComponent } from './home/home.component';
import { FilmResolver } from './services/film.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:search-text',
    component: HomeComponent,
  },
  {
    path: 'search/:search-text/:id',
    component: FilmDetailComponent,
    resolve: {
      film: FilmResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
