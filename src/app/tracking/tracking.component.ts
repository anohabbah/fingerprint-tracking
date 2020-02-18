import { Component, OnInit } from '@angular/core';
import * as Fingerprint from 'fingerprintjs2';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';
import filter from 'lodash/fp/filter';
import pipe from 'lodash/fp/pipe';
import { ApiService } from '../api.service';
import { Connection } from '../connection';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  fingerprint: string;
  time;
  relevantKeys: string[] = ['userAgent', 'language', 'colorDepth', 'deviceMemory',
    'hardwareConcurrency', 'screenResolution', 'availableResolution', 'timezone',
    'platform', 'webglVendorAndRenderer', 'touchSupport'];
  components: { key: string, value: any }[];

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const d1: Date = new Date();
    const components = await Fingerprint.getPromise();
    const valuesStr = pipe(filter(({ key }) => this.relevantKeys.includes(key)), map('value'), join(''))(components);
    const fingerprint = Fingerprint.x64hash128(valuesStr);
    this.apiService
      .apply(fingerprint, components)
      .subscribe((res: Connection) => {
        this.fingerprint = res._id;
        const d2 = new Date();
        // @ts-ignore
        this.time = (d2 - d1);

        this.components = res.fingerprint;
      });
  }
}
