import { Component, OnInit } from '@angular/core';
import { FoodType } from 'src/app/core/interfaces/food.model';
import { OrderFoodType } from 'src/app/core/interfaces/order.model';
import { OrderFoodService } from 'src/app/core/services/availablefood.service';
import { FoodService } from 'src/app/core/services/food.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  foods: OrderFoodType[] = [];

  constructor(
    private foodsService: FoodService,
    private orderFoodService: OrderFoodService
  ) {}

  ngOnInit(): void {
    this.foodsService.foods.subscribe((res) => {
      this.foods = res
        .filter((obj) => obj.visible)
        .map((obj) => {
          return {
            food: { ...obj },
            quantity: 0,
          };
        });
    });
  }

  removeOrder(food: FoodType) {
    const foodsUpdated = [...this.foods];
    const index = foodsUpdated.findIndex((obj) => obj.food.id === food.id);
    foodsUpdated[index].quantity = this.orderFoodService.deleteOrderFood(food);
  }

  addOrder(food: FoodType) {
    const foodsUpdated = [...this.foods];
    const index = foodsUpdated.findIndex((obj) => obj.food.id === food.id);
    foodsUpdated[index].quantity = this.orderFoodService.addOrderFood(food);
  }
}
