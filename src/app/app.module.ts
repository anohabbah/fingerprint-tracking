import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TrackingComponent } from './tracking/tracking.component';

const routes = [
  { path: '', component: TrackingComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    TrackingComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
