import {createAction, props} from '@ngrx/store';
import {Filter, Page} from '..';
import {Beer} from './beer.interface';

export enum BeerType {
    BEERS_LOAD = '[BEER] Beers Load Action',
    BEERS_LOADED = '[BEER] Beers Loaded Action',
    BEERS_CHANGE_FAV = '[BEER] Beers Change Favorite Action',
    BEERS_CHANGED_FAV = '[BEER] Beers Changed Favorite Action',
    BEERS_FAILED = '[BEER] Beers Action',
}


export const loadBeers = createAction(
    BeerType.BEERS_LOAD,
    props<{ filter: Filter }>()
);

export const loadedBeers = createAction(
    BeerType.BEERS_LOADED,
    props<Page>()
);

export const changeFav = createAction(
  BeerType.BEERS_CHANGE_FAV,
  props<Beer>()
);

export const changedFav = createAction(
  BeerType.BEERS_CHANGED_FAV,
  props<Beer>()
);

export const failedBeers = createAction(
    BeerType.BEERS_FAILED,
    props<{ error: any }>()
);
