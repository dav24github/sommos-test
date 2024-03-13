import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthComponent } from './features/admin/auth/auth.component';
import { LayoutComponent } from './core/layout/layout.component';
import { TopbarComponent } from './core/topbar/topbar.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { CartComponent } from './features/client/cart/cart.component';
import { FoodListComponent } from './features/admin/foods/food-list/food-list.component';
import { FoodEditComponent } from './features/admin/foods/food-edit/food-edit.component';
import { ClientComponent } from './features/client/client.component';
import { OrderListComponent } from './features/client/order-list/order-list.component';
import { ClientListComponent } from './features/client/client-list/client-list.component';
import { FoodItemComponent } from './shared/components/food-item/food-item.component';
import { FoodsComponent } from './features/admin/foods/foods.component';
import { AvailableFoodComponent } from './features/admin/foods/available-food/available-food.component';
import { FoodDetailComponent } from './features/client/food-detail/food-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    CartComponent,
    FoodListComponent,
    OrderListComponent,
    ClientListComponent,
    FoodsComponent,
    FoodEditComponent,
    FoodDetailComponent,
    ClientComponent,
    FoodItemComponent,
    AvailableFoodComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
