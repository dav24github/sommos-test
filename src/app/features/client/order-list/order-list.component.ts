import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { FoodType } from 'src/app/core/interfaces/food.model';
import { Subscription } from 'rxjs';
import { OrderFoodService } from 'src/app/core/services/availablefood.service';
import { OrderFoodType } from 'src/app/core/interfaces/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnDestroy {
  orderfoods: OrderFoodType[] = [];
  subscription!: Subscription;

  constructor(
    public dialog: MatDialog,
    private orderFoodService: OrderFoodService
  ) {}

  ngOnInit(): void {
    this.subscription = this.orderFoodService.orderFoodsChanged.subscribe(
      (orders: OrderFoodType[]) => {
        this.orderfoods = orders;
      }
    );
  }

  openDialog(food: FoodType): void {
    this.dialog.open(FoodDetailComponent, {
      data: { name: food.name, price: food.price },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
