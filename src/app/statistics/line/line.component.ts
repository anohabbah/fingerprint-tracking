import { Component, ViewChild, Input } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent {

  @Input('data')
  set seriesUpdates(value: any) {
    this.data = value;
    this.updateSeries();
  }

  constructor() {
    this.chartOptions = {
      series: [
        { name: this.labels, data: this.data}
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: this.title,
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.axes
      }
    };
  }

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any;

  data: any = [];

  @Input()
  labels: any ;
  @Input()
  axes: any;
  @Input()
  title: any;

  updateSeries() {
    this.chartOptions.series = [
      {
        name: this.labels,
        data: this.data
      }
    ];
    this.chartOptions.axes = this.axes;
    this.chartOptions.title = this.title;
  }
}
