import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { FoodType } from './core/interfaces/food.model';
import { Subscription } from 'rxjs';
import { FoodService } from './core/services/food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private foodsService: FoodService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.foodsService.init().then((res) => {
      this.loading = res;
    });
  }

  async onClickDelete(food: FoodType) {
    const response = await this.foodsService.deleteFood(food);
  }
}
