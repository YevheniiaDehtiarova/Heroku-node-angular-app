import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsPage } from '../shared/models/analytics-page.interface';
import { AnalyticService } from '../shared/services/analytics.service';
import {Chart, ChartType} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  public lineChartType: ChartType = "line";

  average: number;
  pending = true;
  aSub: Subscription;

  constructor(private service: AnalyticService) {}

  ngOnDestroy(): void {
    if(this.aSub){
    this.aSub.unsubscribe()
    }
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
     label: 'выручка',
     color: 'rgb(255,99,132)',
    }

    const orderConfig: any = {
      label: 'заказы',
      color: 'rgb(54,162,235)',
     }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage)=> {
      this.average = data.average
      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)
      
      const gainContext = this.gainRef.nativeElement.getContext('2d')
      gainContext.canvas.height = '300px'
      const orderContext = this.gainRef.nativeElement.getContext('2d')
      orderContext.canvas.height = '300px'
      
      new Chart(gainContext, createChartConfig(gainConfig))
      new Chart(gainContext, createChartConfig(orderConfig))

      this.pending = false
    })
  }

}

function createChartConfig({labels,data,label,color}: {labels: any,data:any,label:any,color: any}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label: label,
          data: data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
