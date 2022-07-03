import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as froomRoot from '../reducers';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable, Subject, Subscription} from 'rxjs';
import {BeerState} from '../reducers/beer/beer.interface';
import {debounceTime} from 'rxjs/operators';
import {Filter} from '../reducers';
import {loadBeers} from '../reducers/beer/beer.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // filter fields
  page = 0;
  itemsPerPage = 10;
  filter: string;

  // state and subscriptions
  state: Observable<BeerState>;
  private subscription: Subscription = new Subscription();
  private subject: Subject<string> = new Subject();

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

    // debounce time for filter
    this.subscription.add(this.subject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.filter = value;
      this.page = 0;
      this.applyFilter();
    }));
  }

  /**
   * main method to dispatch load action with all params
   */
  private applyFilter = () => {
    const filter = {
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      filter: this.filter
    } as Filter;

    this.store.dispatch(loadBeers({filter}));
  }

}
