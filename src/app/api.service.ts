import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connection } from './connection';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private statisticsBaseURL = '/api/statistics';

  constructor(private http: HttpClient) {}

  apply(fingerprint, data): Observable<Connection> {
    return this.http.put<Connection>('/api/connections/' + fingerprint, { fingerprint: data });
  }

  getSystemStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/systems`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getGraphicCardStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/graphic-cards`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getTimezoneStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/timezones`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getDeviceMemoryStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/momeries`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getHardwareConcurrencyStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/hardware-concurrency`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getBrowserLanguageStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/languages`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getBrowserStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/user-agents`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getUserStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/users`)
      .pipe(map((res: { data: object }) => res.data));
  }

  getMonthlyConnectionStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/monthly`)
      .pipe(map((res: { data: object }) => res.data));
  }
}
