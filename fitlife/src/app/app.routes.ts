import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { FoodComponent } from './pages/food/food';
import { ShopComponent } from './pages/shop/shop';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'food', component: FoodComponent },
  { path: 'shop', component: ShopComponent },
];
