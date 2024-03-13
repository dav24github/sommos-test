import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodType } from 'src/app/core/interfaces/food.model';
import { OrderFoodType } from 'src/app/core/interfaces/order.model';
import { OrderFoodService } from 'src/app/core/services/availablefood.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnDestroy {
  orderfoods: OrderFoodType[] = [];
  subscription!: Subscription;

  constructor(private orderFoodService: OrderFoodService) {}

  ngOnInit(): void {
    this.subscription = this.orderFoodService.orderFoodsChanged.subscribe(
      (orders: OrderFoodType[]) => {
        this.orderfoods = orders.map((obj) => {
          return {
            ...obj,
            items: Array.from(Array(obj.quantity).keys()),
          };
        });
      }
    );
  }

  removeOrder(food: FoodType) {
    const foodsUpdated = [...this.orderfoods];
    const index = foodsUpdated.findIndex((obj) => obj.food.id === food.id);
    foodsUpdated[index].quantity = this.orderFoodService.deleteOrderFood(food);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
