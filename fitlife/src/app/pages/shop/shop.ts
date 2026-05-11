import { Component } from '@angular/core';
import { ShopService } from '../../services/shop';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.html',
})
export class ShopComponent {
  constructor(public shopService: ShopService) {}

  toggle(catIdx: number, itemId: number) {
    this.shopService.toggleItem(catIdx, itemId);
  }

  reset() {
    this.shopService.reset();
  }
}
