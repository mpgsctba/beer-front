import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Filter, Page} from '..';
import {urlBase} from 'src/environments/environment';
import {BeerType, changedFav, failedBeers, loadedBeers} from './beer.action';
import {Beer} from './beer.interface';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class BeerEffects {

  constructor(private actions$: Actions, private http: HttpClient, private toastService: ToastrService) {
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

  changeFav = createEffect(() => this.actions$.pipe(
    ofType(BeerType.BEERS_CHANGE_FAV),
    mergeMap((action: Beer ) => {
        return this.http.patch<Beer>(urlBase + 'beers/' + action.id + '/favorite/' + !action.favorite , null).pipe(
          map(result => {
            this.toastService.success(result.favorite ? 'Beer ' + result.name + ' added to favorites' : 'Beer ' + result.name + ' removed from favorites');
            return changedFav(result);
          }),
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
    if (!!filter.favorite) {
      params = params.append('favorite', String(filter.favorite));
    }
    return params;
  }
}
