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

const dataLocal = [
  {
    visible: true,
    price: 30,
    name: 'Pizza peperoni - local',
    id: '0FVtEuGCXht8utPkEbit',
  },
  {
    price: 45,
    name: 'Pizza carnivora - local',
    visible: true,
    id: 'FHcuLP1xGR8ENjEDkkYo',
  },
  {
    visible: true,
    price: 22,
    name: 'Pizzar tradicional - local',
    id: 'Tjm2MDiHBVHkhwbIBjOj',
  },
  {
    name: 'Pizza napolitana - local',
    visible: false,
    price: 10,
    id: 'kg8KxiEHE7SVeyvrnHu6',
  },
  {
    visible: true,
    price: 20,
    name: 'Pizza hawaiana - local',
    id: 'namoc3eUu9TiySJLGgIv',
  },
];

@Injectable({ providedIn: 'root' })
export class FoodService {
  foods = new BehaviorSubject<FoodType[]>([]);

  constructor(private firestore: Firestore) {}

  init(): Promise<boolean> {
    return new Promise((myResolve, _) => {
      this.getFoods().subscribe({
        next: (items) => {
          console.log(items);

          this.foods.next(items);
          myResolve(false);
        },
        error: (_) => {
          this.foods.next(dataLocal);
          myResolve(false);
        },
      });
    });
  }

  addFood(food: FoodType) {
    const foodRef = collection(this.firestore, 'foods');
    return addDoc(foodRef, food);
  }

  getFoods(): Observable<FoodType[]> {
    const foodRef = collection(this.firestore, 'foods');
    return collectionData(foodRef, { idField: 'id' }) as Observable<FoodType[]>;
  }

  editFood(food: FoodType, newFood: FoodType) {
    const foodDocRef = doc(this.firestore, `foods/${food.id}`);
    const newDate = {
      name: newFood.name,
      price: newFood.price,
      visible: newFood.visible,
    };
    return updateDoc(foodDocRef, newDate);
  }

  deleteFood(food: FoodType) {
    const foodDocRef = doc(this.firestore, `foods/${food.id}`);
    return deleteDoc(foodDocRef);
  }
}
