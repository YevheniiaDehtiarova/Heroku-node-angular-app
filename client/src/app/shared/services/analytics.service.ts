import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnalyticsPage } from "../models/analytics-page.interface";
import { OverviewPage } from "../models/overviewpage.interface";

@Injectable({
    providedIn: 'root'
})
export class AnalyticService{
    constructor(private http: HttpClient){}

    getOverview(): Observable<OverviewPage>{
     return  this.http.get<OverviewPage>('/api/analytics/overview')
    }

    getAnalytics(): Observable<AnalyticsPage>{
        return  this.http.get<AnalyticsPage>('/api/analytics/analytics')
    }
}