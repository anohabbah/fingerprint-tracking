import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connection } from './connection';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  apply(fingerprint, data): Observable<Connection> {
    return this.http.put<Connection>('/api/connections/' + fingerprint, { fingerprint: data });
  }
}
