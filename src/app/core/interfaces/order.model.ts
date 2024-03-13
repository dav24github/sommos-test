import { FoodType } from './food.model';

export interface OrderFoodType {
  food: FoodType;
  items?: number[];
  quantity: number;
}
