import { Component } from '@angular/core';
import { FoodType } from 'src/app/core/interfaces/food.model';
import { FoodService } from 'src/app/core/services/food.service';

@Component({
  selector: 'app-available-food',
  templateUrl: './available-food.component.html',
  styleUrls: ['./available-food.component.scss'],
})
export class AvailableFoodComponent {
  foods: FoodType[] = [];

  constructor(private foodsService: FoodService) {}

  ngOnInit(): void {
    this.foodsService.foods.subscribe((res) => {
      this.foods = res.filter((obj) => obj.visible);
    });
  }

  async editFoodVisibility(food: FoodType, mode: boolean) {
    const data: FoodType = {
      name: food.name,
      price: food.price,
      visible: mode,
    };
    const response = await this.foodsService.editFood(food, data);
  }
}
