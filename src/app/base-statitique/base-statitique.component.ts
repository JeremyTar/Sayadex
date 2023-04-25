import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-base-statitique',
  templateUrl: './base-statitique.component.html',
  styleUrls: ['./base-statitique.component.scss']
})
export class BaseStatitiqueComponent {
  chart: any;
  
  ngOnInit() {
    const canvas = document.getElementById('radar-chart') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
        datasets: [
          {
            data: [3, 5, 1, 7, 2, 6],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
          }
        ]
      },
      options: {
        elements: {
          line: {
            borderWidth: 0.5
          }
        },
        scale: {
          angleLines: {
            display: false
          },
          ticks: {
            display: false,
            maxTicksLimit: 6,
            suggestedMin: 0,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        polygon: {
          sides: 6
        }
      }
    });
  }

}