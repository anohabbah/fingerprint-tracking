import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Observable, of} from 'rxjs';

export type DataType = any[][];

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  lastConnections$: Observable<any[]>;

  dataEvolution = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  axesEvolution = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep'
  ];
  labelsEvolution = 'Desktops';
  titreEvolution = 'Product Trends by Month';

  systems$: Observable<DataType>;
  timezones$: Observable<DataType>;
  screenResolutions$: Observable<DataType>;
  memories$: Observable<DataType>;
  cores$: Observable<DataType>;
  languages$: Observable<DataType>;
  browser$: Observable<DataType>;
  graphicCards$: Observable<string[]>;
  monthlyConnections$: Observable<DataType>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.systems$ = this.apiService.getSystemStats();
    this.timezones$ = this.apiService.getTimezoneStats();
    this.memories$ = this.apiService.getDeviceMemoryStats();
    this.screenResolutions$ = this.apiService.getDeviceResolutionStats();
    this.cores$ = this.apiService.getHardwareConcurrencyStats();
    this.languages$ = this.apiService.getBrowserLanguageStats();
    this.browser$ = this.apiService.getBrowserStats();
    this.graphicCards$ = this.apiService.getGraphicCardStats();
    this.lastConnections$ = this.apiService.getUserStats();
    this.monthlyConnections$ = this.apiService.getMonthlyConnectionStats();
  }
}