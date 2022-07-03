import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer, BeerState} from '../../reducers/beer/beer.interface';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as froomRoot from '../../reducers';
import {changeFav} from '../../reducers/beer/beer.action';

@Component({
  selector: 'app-card-beer',
  templateUrl: './card-beer.component.html',
  styleUrls: ['./card-beer.component.scss']
})
export class CardBeerComponent implements OnInit {

  @Input()
  public beer: Beer;

  // state and subscriptions
  state: Observable<BeerState>;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<froomRoot.State>) {
    this.beer = {} as Beer;
    this.state = store.select('beers');
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
  }

  updateFavorite = () => {
    this.store.dispatch(changeFav(this.beer));

  }
}
