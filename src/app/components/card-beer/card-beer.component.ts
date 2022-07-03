import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer} from '../../reducers/beer/beer.interface';

@Component({
  selector: 'app-card-beer',
  templateUrl: './card-beer.component.html',
  styleUrls: ['./card-beer.component.scss']
})
export class CardBeerComponent implements OnInit {

  @Input()
  public beer: Beer;

  constructor() {
    this.beer = {} as Beer;
  }

  ngOnInit(): void {
  }

}
