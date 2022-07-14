import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { NotesService } from 'src/app/services/notes/notes.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartData<'bar'> = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      { data: [ 0, 0, 0, 0, 0, 0, 0] }
    ]
  };


  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.queryReports();
  }

  queryReports() {
    return this.notesService.getReports().subscribe({
      next: ((response: any) => {
        this.barChartData.datasets = [
          {
            data : response,
            label: 'Ventas pagadas'
          }
        ];
        this.chart?.update();
      })
    })

    
  }

}
