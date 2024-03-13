import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderFoodService } from '../services/availablefood.service';
import { Subscription } from 'rxjs';
import { OrderFoodType } from '../interfaces/order.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnDestroy {
  isAdmin!: boolean;
  subscription!: Subscription;
  totalPrice: number = 0;
  totalFood: number = 0;

  constructor(
    public authService: AuthService,
    private Router: Router,
    public orderFoodService: OrderFoodService
  ) {
    Router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        const url = val.url.split('/');
        if (url.includes('admin')) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscription = this.orderFoodService.orderFoodsChanged.subscribe(
      (orders: OrderFoodType[]) => {
        this.totalPrice = orders.reduce((a: number, b: OrderFoodType) => {
          const priceB = b.food.price ? b.food.price * b.quantity : 0;
          return a + priceB;
        }, 0);
        this.totalFood = orders.length;
      }
    );
  }

  home() {
    this.Router.navigate(['admin/client']);
  }

  goWeb() {
    this.authService.logout();
    this.Router.navigate(['web/client']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
