import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { TableStat, datasetChart } from '../pokeClass';

@Component({
  selector: 'app-chart-bar-stat',
  templateUrl: './chart-bar-stat.component.html',
  styleUrls: ['./chart-bar-stat.component.scss']
})
export class ChartBarStatComponent {
  @Input() stats!: TableStat
  chartBars!: Chart;

  ngOnInit() {
    const canvas = document.getElementById('BarStat') as HTMLCanvasElement;
    console.log(this.stats)

    this.chartBars = new Chart(canvas, {
      type: 'bar',
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
          label: "Value",
          data: [this.stats.hp.base_stat, this.stats.defense.base_stat,this.stats.specialDefense.base_stat, this.stats.speed.base_stat, this.stats.specialAttack.base_stat, this.stats.attack.base_stat],
          backgroundColor: ['rgba(100,170,100, 0.5)'],
          borderColor: ['rgba(0,128,0, 0.5)'],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 200,
          }
        },
        indexAxis: 'y',
        elements: {
        }
      },
    });
  }
}
