import {createReducer, on} from '@ngrx/store';
import {BeerState} from './beer.interface';
import {failedBeers, loadedBeers, loadBeers} from './beer.action';


export const offerInitialState: BeerState = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
};

export const beerReducer = createReducer(
    offerInitialState,
    on(loadBeers, (state) => ({...state, loading: true})),
    on(loadedBeers, (state, data) => ({...state, content: data.content, totalPages: data.totalItems,
      totalElements: data.totalItems, size: data.size, number: data.size, loading: false})),
    on(failedBeers, (state) => ({...state, loading: false})),
);
