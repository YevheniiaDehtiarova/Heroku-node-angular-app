import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Filter } from '../shared/models/filter.interface';
import { Order } from '../shared/models/order.interface';
import { OrdersService } from '../shared/services/orders.service';


const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef
  isFilterVisible = false;
  tooltip: MaterialInstance;
  oSub:Subscription;
  orders: Array<Order> = [];
  filter: Filter = {}
  loading = false;
  reloading = false;
  noMoreOrders = false;

  offset = 0;
  limit = STEP;


  constructor(private ordersService: OrdersService) { }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch()
  }

  private fetch(){
    const params = Object.assign({},this.filter, {
      offset: this.offset,
      limit: this.limit
    })

    this.oSub = this.ordersService.fetch().subscribe(orders => {
       this.orders = this.orders.concat(orders)
       this.noMoreOrders = orders.length < STEP;
       this.loading = false
       this.reloading = false
    })
  }

  loadMore(){
    this.offset +=STEP;
    this.loading = true;
    this.fetch()
  }

  applyFilter(filter: Filter){
    this.orders = [];
    this.offset = 0;
    this.filter = {}
    this.reloading = true;
    this.fetch();
  }
}
