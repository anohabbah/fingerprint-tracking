import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  labelsSystem = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesSystem = [410, 20, 30, 56, 50];

  listGraphique = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  listDerniereConnexion = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  listDerniere = 'Team A';

  labelsTime = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesTime = [10, 20, 30, 56, 50];

  labelsResolution = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesResolution = [10, 20, 30, 56, 50];

  labelsMemory = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesMemory = [10, 20, 30, 56, 50];

  labelsHardware = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesHardware = [10, 20, 30, 56, 50];

  labelsLanguage = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesLanguage = [10, 20, 30, 56, 50];

  labelsNavigate = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesNavigate = [10, 20, 30, 56, 50];

  labelsConnexion = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  seriesConnexion = [10, 20, 30, 56, 50];

  dataEvolution = [10, 41, 35, 51, 49, 62, 69, 91, 148];
  axesEvolution = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep'
  ];
  labelsEvolution = 'Desktops';
  titreEvolution = 'Product Trends by Month';

  constructor() {}

  ngOnInit() {}
}
