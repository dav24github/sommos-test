import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { FoodType } from '../interfaces/food.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { OrderFoodType } from '../interfaces/order.model';

@Injectable({ providedIn: 'root' })
export class OrderFoodService {
  orderFoodsChanged = new BehaviorSubject<OrderFoodType[]>([]);
  private orderFoods: OrderFoodType[] = [];

  constructor() {}

  setOrderFoods(orderFoods: OrderFoodType[]) {
    this.orderFoods = orderFoods;
    this.orderFoodsChanged.next(this.orderFoods.slice());
  }

  getOrderFoods() {
    return this.orderFoods.slice();
  }

  getOrderFood(index: number) {
    return this.orderFoods[index];
  }

  addOrderFood(food: FoodType) {
    const index = this.orderFoods.findIndex((obj) => obj.food.id === food.id);
    if (index === -1) {
      this.orderFoods.push({ food: food, quantity: 1 });
      this.orderFoodsChanged.next(this.orderFoods.slice());
      return 1;
    } else {
      const ordersUpdated = [...this.orderFoods];
      ordersUpdated[index].quantity = ordersUpdated[index].quantity + 1;
      this.orderFoods = ordersUpdated.slice();
      this.orderFoodsChanged.next(ordersUpdated.slice());
      return ordersUpdated[index].quantity;
    }
  }

  deleteOrderFood(food: FoodType) {
    const index = this.orderFoods.findIndex((obj) => obj.food.id === food.id);
    if (this.orderFoods[index].quantity === 1) {
      this.orderFoods.splice(index, 1);
      this.orderFoodsChanged.next(this.orderFoods.slice());
      return 0;
    } else {
      const ordersUpdated = [...this.orderFoods];
      ordersUpdated[index].quantity = ordersUpdated[index].quantity - 1;
      this.orderFoods = ordersUpdated.slice();
      this.orderFoodsChanged.next(ordersUpdated.slice());
      return ordersUpdated[index].quantity;
    }
  }
}
