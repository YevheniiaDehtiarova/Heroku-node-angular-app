export interface AnalyticsPage{
    average: number;
    chart: Array<AnalyticSChartItem>
}

export interface AnalyticSChartItem{
    gain: number;
    order: number;
    label:string;
}