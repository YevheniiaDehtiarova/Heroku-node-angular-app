import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OverviewPage } from '../shared/models/overviewpage.interface';
import { AnalyticService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  data$: Observable<OverviewPage>;
  tapTarget: MaterialInstance;

  yesterday = new Date()


  constructor(private service: AnalyticService) { }

  ngOnDestroy(): void {
    if(this.tapTarget){
    this.tapTarget.destroy()
    }
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnInit(): void {
    this.data$ = this.service.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }
  openInfo(){
    this.tapTarget.open()
  }

}
