import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('barChart', { static: true }) barChart;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.25,
  };
  bars: any;
  colorArray: any;
  constructor() {}

  displayedColumns: string[] = ['first_name', 'last_name', 'twitter'];
  dataSource = new MatTableDataSource<any>([
    {
      first_name: 'Max',
      last_name: 'Lynch',
      twitter: 'maxlynch'
    },
    {
      first_name: 'Matt',
      last_name: 'Netkow',
      twitter: 'dotNetkow'
    },
    {
      first_name: 'Ben',
      last_name: 'Sperry',
      twitter: 'benjsperry'
    }
  ]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
          label: 'Offline',
          data: [1.5, 2.8, 4, 4.9, 3.9, 4.5, 7, 12],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: '#C2185B',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
          label: 'Online',
          data: [1, 1.8, 3, 2.9, 0.9, 1.5, 4, 7],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: '#0D47A1',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
