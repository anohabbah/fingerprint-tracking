import {Component, Input} from '@angular/core';
import {DataType} from '../statistics.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input()
  title: string;

  series: number[];
  labels: string[];

  @Input()
  set data(value: DataType) {
    [this.labels, this.series] = value;
    if (this.title === 'Connexions Mensuelles') {
      console.log(value, this.labels, this.series);
    }
  }

  get data(): DataType {
    return [this.labels, this.series];
  }
  constructor() {}

}
