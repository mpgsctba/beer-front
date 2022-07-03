import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Filter, Page} from '..';
import {urlBase} from 'src/environments/environment';
import {BeerType, failedBeers, loadedBeers} from './beer.action';

@Injectable()
export class BeerEffects {

  constructor(private actions$: Actions, private http: HttpClient) {
  }

  loadBeers$ = createEffect(() => this.actions$.pipe(
    ofType(BeerType.BEERS_LOAD),
    mergeMap((action: { filter: Filter }) => {
        const params = this.buildHttpParams(action.filter);
        return this.http.get<Page>(urlBase + 'beers', {params}).pipe(
          map(result => loadedBeers(result)),
          catchError((error) => of(failedBeers({error})))
        );
      }
    )
  ));

  private buildHttpParams = (filter: Filter): HttpParams => {
    let params = new HttpParams();
    if (!!filter.page) {
      params = params.append('page', filter.page.toString());
    }
    if (!!filter.itemsPerPage) {
      params = params.append('itemsPerPage', filter.itemsPerPage.toString());
    }
    if (!!filter.filter) {
      params = params.append('name', filter.filter);
    }
    return params;
  }
}
