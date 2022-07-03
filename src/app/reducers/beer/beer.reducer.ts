import {createReducer, on} from '@ngrx/store';
import {BeerState} from './beer.interface';
import {failedBeers, loadedBeers, loadBeers, changeFav, changedFav} from './beer.action';


export const offerInitialState: BeerState = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 1,
};

export const beerReducer = createReducer(
    offerInitialState,
    on(loadBeers, changeFav, (state) => ({...state, loading: true})),
    on(loadedBeers, (state, data) => ({...state, content: data.content, totalPages: data.totalPages,
      totalElements: data.totalElements, size: data.size, number: (data.number + 1), loading: false})),
    on(changedFav, (state, data) => {
      const list = [...state.content];
      list[list.findIndex(item => item.id === data.id)] = data;
      return ({...state, content: list, loading: false});
    }),
    on(failedBeers, (state) => ({...state, loading: false})),
);
