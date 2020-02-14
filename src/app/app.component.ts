import {Component, OnInit} from '@angular/core';
import * as Fingerprint from 'fingerprintjs2';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';
import pipe from 'lodash/fp/pipe';
import {ApiService} from './api.service';
import {Connection} from './connection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fingerprint: string;
  time;
  details: string;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const d1: Date = new Date();
    const components = await Fingerprint.getPromise();
    const fingerprint = Fingerprint.x64hash128(pipe(map('value'), join(''))(components));
    this.apiService
      .apply(fingerprint, components)
      .subscribe((res: Connection) => {
        console.log(res);
        this.fingerprint = res._id;
        const d2 = new Date();
        // @ts-ignore
        this.time = (d2 - d1);

        this.details = pipe(
          map(({ key, value }) => `${key} = ${String(value).substr(0, 100)}`),
          join('\n')
        )(res.fingerprint);
      });
  }
}
