import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexTitleSubtitle, ApexPlotOptions} from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
}

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input()
  series: number[];

  @Input()
  labels: string[];

  @Input()
  title: any;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        width: '100%',
        type: 'donut'
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
      ],
      title: this.title
    };
  }
}
