import { Component, ViewChild, Input } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent {

  @Input('series')
  set seriesUpdates(value: any) {
    this.series = value;
    this.updateSeries();
  }



  constructor() {
    this.chartOptions = {
      series: this.series,
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: this.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any;

  series: any;
  @Input()
  labels: any;

  updateSeries() {
    this.chartOptions.series = this.series;
    this.chartOptions.labels = this.labels;
  }
}
