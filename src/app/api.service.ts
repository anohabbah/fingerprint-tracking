import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Connection } from './connection';
import {catchError, map} from 'rxjs/operators';
import {error} from 'winston';

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
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getSystemStats', {}))
      );
  }

  getGraphicCardStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/graphic-cards`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getGraphicCardStats', {}))
      );
  }

  getTimezoneStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/timezones`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getTimezoneStats', {}))
      );
  }

  getDeviceMemoryStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/momeries`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getDeviceMemoryStats', {}))
      );
  }

  getHardwareConcurrencyStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/hardware-concurrency`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getHardwareConcurrencyStats', {}))
      );
  }

  getBrowserLanguageStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/languages`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getBrowserLanguageStats', {}))
      );
  }

  getBrowserStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/user-agents`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getBrowserStats', {}))
      );
  }

  getUserStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/users`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getUserStats', {}))
      );
  }

  getMonthlyConnectionStats(): Observable<object> {
    return this.http
      .get(`${this.statisticsBaseURL}/monthly`)
      .pipe(
        map((res: { data: object }) => res.data),
        catchError(this.handleError('getMonthlyConnectionStats', {}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);

      // this.log(`${operation} failed: ${err.message}`);

      return of(result as T);
    };
  }
}
