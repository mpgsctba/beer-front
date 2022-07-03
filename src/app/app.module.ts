import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CardBeerComponent } from './components/card-beer/card-beer.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {EffectsModule} from '@ngrx/effects';
import {metaReducers, reducers} from './reducers';
import {StoreModule} from '@ngrx/store';
import {BeerEffects} from './reducers/beer/beer.effects';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardBeerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // spinner
    NgxSpinnerModule,

    // reducer
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([
      BeerEffects,
    ]),

    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
