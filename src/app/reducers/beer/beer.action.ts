import {createAction, props} from '@ngrx/store';
import {Filter, Page} from '..';

export enum BeerType {
    BEERS_LOAD = '[BEER] Beers Load Action',
    BEERS_LOADED = '[BEER] Beers Loaded Action',
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

export const failedBeers = createAction(
    BeerType.BEERS_FAILED,
    props<{ error: any }>()
);
