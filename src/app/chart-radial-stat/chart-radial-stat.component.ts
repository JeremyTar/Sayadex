import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { TableStat } from '../pokeClass';

@Component({
  selector: 'app-chart-radial-stat',
  templateUrl: './chart-radial-stat.component.html',
  styleUrls: ['./chart-radial-stat.component.scss']
})
export class ChartRadialStatComponent {
  @Input() stats!: TableStat
  @Input() name!: string
  @Input() averageStat!: TableStat

  chartRadial!: Chart;
  
  ngOnInit() {
    const canvas = document.getElementById('RadialStat') as HTMLCanvasElement;
    this.chartRadial = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: [
        this.stats.hp.stat.name,
        this.stats.defense.stat.name,
        this.stats.specialDefense.stat.name,
        this.stats.speed.stat.name,
        this.stats.specialAttack.stat.name,
        this.stats.attack.stat.name
      ],
      datasets: [{
        label: this.name.charAt(0).toUpperCase() + this.name.slice(1),
        data: [this.stats.hp.base_stat, this.stats.defense.base_stat,this.stats.specialDefense.base_stat, this.stats.speed.base_stat, this.stats.specialAttack.base_stat, this.stats.attack.base_stat],
        fill: true,
        backgroundColor: 'rgba(100,170,100, 0.5)',
        borderColor: 'rgba(0,128,0, 0.5)',
        pointBackgroundColor: 'rgb(0,128,0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(0,128,0)'
      }, {
        label: 'Pokemon average',
        data: [this.averageStat.hp.base_stat, this.averageStat.defense.base_stat, this.averageStat.specialDefense.base_stat, this.averageStat.speed.base_stat, this.averageStat.specialAttack.base_stat, this.averageStat.attack.base_stat],
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderColor: 'rgba(255, 0, 0, 0.5)',
        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 0, 0, 1)'
      }]
    },
    options: {
      elements: {
        line: {
          borderWidth: 3
          }
        },
        scales: {
          r: {
            suggestedMax: 250,
            suggestedMin: 0
          }
        }
      },
    });
  }
}