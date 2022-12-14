import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Order, OrderPosition } from '../shared/models/order.interface';
import { OrderService } from '../shared/services/order.service';
import { OrdersService } from '../shared/services/orders.service';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit,OnDestroy,AfterViewInit {
  isRoot: boolean;
  modal: MaterialInstance;
  oSub: Subscription;
  pending = false;
  @ViewChild('modal') modalRef: ElementRef;

  constructor(private router: Router,
              public order: OrderService,
              private ordersService: OrdersService) { }

  ngOnDestroy(): void {
    this.modal.destroy();
    if(this.oSub){
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit(): void {
     this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
      this.isRoot = this.router.url === '/order'
      }
    })
  }

  open(){
   this.modal.open();
  }

  removePosition(orderPosition: OrderPosition){
    this.order.remove(orderPosition)
  }
  cancel(){
    this.modal.close();
  }
  submit(){
   this.pending = true;

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.ordersService.create(order).subscribe(
      newOrder => {
       MaterialService.toast(`заказ с  ${newOrder.order} был добавлен`)
       this.order.clear()
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

}
