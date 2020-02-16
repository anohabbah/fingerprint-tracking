import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TrackingComponent } from './tracking/tracking.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { PieComponent } from './statistics/pie/pie.component';
import { LineComponent } from './statistics/line/line.component';
import { CardComponent } from './statistics/card/card.component';

const routes = [
  { path: '', component: TrackingComponent, pathMatch: 'full' },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TrackingComponent,
    StatisticsComponent,
    PieComponent,
    LineComponent,
    CardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }),
    NgApexchartsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
