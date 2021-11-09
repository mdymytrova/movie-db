import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { ApiListQueryParamsObject } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public form!: FormGroup;
  public typeList = [
    { id: 'movie', label: 'Film' },
    { id: 'series', label: 'Series'},
    { id: 'all', label: 'All'}
  ];
  public noTitle: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null],
      type: 'all',
      year: [null]
    });

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.form.patchValue({
          title: data?.state?.root?.firstChild?.params['search-text'] || null,
          type: data?.state?.root?.firstChild?.queryParams['type'] || 'all',
          year: data?.state?.root?.firstChild?.queryParams['year'] || null
        });
      }
    });

    this.form.controls['title'].valueChanges.subscribe(change => {
      if (this.noTitle && change !== '') {
        this.noTitle = false;
      }
    });
  }

  public search() {
    if (this.form.valid) {
      this.noTitle = false;
      const queryParams: ApiListQueryParamsObject = {
        title: this.form.value.title
      };
      if (this.form.value.type && this.form.value.type !== 'all') {
        queryParams.type = this.form.value.type;
      }
      if (this.form.value.year) {
        queryParams.year = this.form.value.year;
      }
      this.router.navigate(['search', this.form.value.title], { queryParams });
    } else {
      this.noTitle = true;
    }
  }

  public clearSearch() {
    this.form.reset();
    this.router.navigate(['/']);
  }
}
