import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {BeerState} from '../reducers/beer/beer.interface';
import {Store} from '@ngrx/store';
import * as froomRoot from '../reducers';
import {NgxSpinnerService} from 'ngx-spinner';
import {Filter} from '../reducers';
import {loadBeers} from '../reducers/beer/beer.action';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  // filter fields
  page = 0;
  itemsPerPage = 10;
  filter: string;

  // state and subscriptions
  state: Observable<BeerState>;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<froomRoot.State>, private loadingService: NgxSpinnerService) {
    this.state = store.select('beers');
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    // initial load
    this.applyFilter();

    this.subscription.add(this.state.subscribe(state => {
      console.log(state);
      if (state.loading) {
        this.loadingService.show();
      } else {
        this.loadingService.hide();
      }
    }));
  }

  changePage = (page) => {
    this.page = page;
    this.applyFilter();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  /**
   * main method to dispatch load action with all params
   */
  private applyFilter = () => {
    const filter = {
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      filter: this.filter,
      favorite: true
    } as Filter;

    this.store.dispatch(loadBeers({filter}));
  }

}
