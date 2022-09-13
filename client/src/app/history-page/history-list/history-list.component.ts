import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order } from 'src/app/shared/models/order.interface';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input('orders') orders: Array<Order>;
  @ViewChild('modal') modalRef: ElementRef;

  modal:MaterialInstance;
  selectedOrder: Order;
  
  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  computePrice(order: Order): number {
   return order.list.reduce((total,item: any) => {
     return total += item.quantity *item.cost
   },0)
  }
  selectOrder(order: Order){
   this.selectedOrder = order;
   this.modal.open()
  }

  closeModal(){
    this.modal.close()
  }

}
