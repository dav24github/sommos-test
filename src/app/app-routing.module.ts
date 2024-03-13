import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthComponent } from './features/admin/auth/auth.component';
import { CartComponent } from './features/client/cart/cart.component';
import { ClientComponent } from './features/client/client.component';
import { FoodsComponent } from './features/admin/foods/foods.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin/client', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin/auth',
        component: AuthComponent,
      },
      {
        path: 'admin/client',
        canActivate: [AuthGuard],
        component: ClientComponent,
      },
      {
        path: 'admin/foods',
        canActivate: [AuthGuard],
        component: FoodsComponent,
      },

      {
        path: 'web/client',
        component: ClientComponent,
      },
      {
        path: 'web/cart',
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
