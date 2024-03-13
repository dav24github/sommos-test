import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodEditComponent } from '../food-edit/food-edit.component';
import { FoodType } from 'src/app/core/interfaces/food.model';
import { FoodService } from 'src/app/core/services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent {
  foods: FoodType[] = [];
  foodSelected!: FoodType;

  constructor(public dialog: MatDialog, private foodsService: FoodService) {}

  ngOnInit(): void {
    this.foodsService.foods.subscribe((res) => {
      this.foods = res;
    });
  }

  openDialog(food: FoodType | null = null): void {
    if (food) this.foodSelected = food;
    const dialogRef = this.dialog.open(FoodEditComponent, {
      data: !food ? null : { name: food.name, price: food.price },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.type === 'new') this.saveFood(result);
        if (result.type === 'edit') this.editFood(result);
      }
    });
  }

  async saveFood(result: any) {
    const data: FoodType = {
      name: result.name,
      price: result.price,
      visible: true,
    };
    const response = await this.foodsService.addFood(data);
  }

  async editFood(result: any) {
    const data: FoodType = {
      name: result.name,
      price: result.price,
      visible: this.foodSelected.visible,
    };
    const response = await this.foodsService.editFood(this.foodSelected, data);
  }

  async editFoodVisibility(food: FoodType, mode: boolean) {
    const data: FoodType = {
      name: food.name,
      price: food.price,
      visible: mode,
    };
    const response = await this.foodsService.editFood(food, data);
  }

  async deleteFood(food: FoodType) {
    const response = await this.foodsService.deleteFood(food);
  }
}
