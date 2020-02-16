import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Connection } from './connection';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { DataType} from './statistics/statistics.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private statisticsBaseURL = '/api/statistics';

  constructor(private http: HttpClient) {}

  apply(fingerprint, data): Observable<Connection> {
    return this.http.put<Connection>('/api/connections/' + fingerprint, { fingerprint: data });
  }

  getSystemStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/os`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getSystemStats', [[], []]))
      );
  }

  getGraphicCardStats(): Observable<string[]> {
    return this.http
      .get(`${this.statisticsBaseURL}/graphic-cards`)
      .pipe(
        map((res: { data: string[] }) => res.data),
        shareReplay(),
        catchError(this.handleError('getGraphicCardStats', []))
      );
  }

  getTimezoneStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/timezones`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getTimezoneStats', [[], []]))
      );
  }

  getDeviceResolutionStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/resolutions`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getDeviceMemoryStats', [[], []]))
      );
  }

  getDeviceMemoryStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/memories`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getDeviceMemoryStats', [[], []]))
      );
  }

  getHardwareConcurrencyStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/hardware-concurrency`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getHardwareConcurrencyStats', [[], []]))
      );
  }

  getBrowserLanguageStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/languages`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getBrowserLanguageStats', [[], []]))
      );
  }

  getBrowserStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/user-agents`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getBrowserStats', [[], []]))
      );
  }

  getUserStats(): Observable<object[]> {
    return this.http
      .get(`${this.statisticsBaseURL}/connections`)
      .pipe(
        map((res: { data: object[] }) => res.data),
        shareReplay(),
        catchError(this.handleError('getUserStats', []))
      );
  }

  getMonthlyConnectionStats(): Observable<DataType> {
    return this.http
      .get(`${this.statisticsBaseURL}/monthly`)
      .pipe(
        map((res: { data: DataType }) => res.data),
        shareReplay(),
        catchError(this.handleError('getMonthlyConnectionStats', [[], []]))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error('ERROR HANDLER : %o', err);

      // this.log(`${operation} failed: ${err.message}`);

      return of(result);
    };
  }
}
