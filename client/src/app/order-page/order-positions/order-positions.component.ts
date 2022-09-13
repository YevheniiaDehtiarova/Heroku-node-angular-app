import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/models/position.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private orderService: OrderService) { }

  ngOnInit(): void {
   this.positions$ =  this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params['id'])
        }
      ),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1;
          console.log(position)
          return position
        })
      })
    )
    this.positions$.subscribe(p=> console.log(p))
  }
  addToOrder(position: Position){
    MaterialService.toast('добавлено ${position.quantity} в заказ')
    this.orderService.add(position)
  }
}
