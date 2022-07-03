import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {BeerState} from './beer/beer.interface';
import {beerReducer} from './beer/beer.reducer';

export interface State {
    beers: BeerState;
}

export const reducers: ActionReducerMap<State> = {
    beers: beerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export interface Filter {
    page: number;
    itemsPerPage: number;
    filter?: string;
    favorite?: boolean;
}

export interface Loadable {
    loading?: boolean;
}

export interface Page {
    content: any[];
    totalElements: number;
    number: number;
    size: number;
    totalPages: number;
}
