import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {BeerState} from '../../reducers/beer/beer.interface';
import {Store} from '@ngrx/store';
import * as froomRoot from '../../reducers';
import {NgxSpinnerService} from 'ngx-spinner';
import {Page} from '../../reducers';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  // state and subscriptions
  state: Observable<BeerState>;
  private subscription: Subscription = new Subscription();

  @Input()
  page: Page;

  current = 1;

  @Output()
  currentPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(private store: Store<froomRoot.State>, private loadingService: NgxSpinnerService) {
    this.state = store.select('beers');
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.subscription.add(this.state.subscribe(state => {
      if (this.current !== state.number) {
        this.current = state.number;
      }
    }));
  }

  loadPage = (page) => {
    this.currentPage.emit(page);
  }

}
