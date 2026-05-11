import { Injectable, signal, computed, effect } from '@angular/core';

export interface ShopItem {
  id: number;
  name: string;
  price: string;
  checked: boolean;
}

export interface ShopCategory {
  icon: string;
  title: string;
  items: ShopItem[];
}

const STORAGE_KEY = 'fitlife_checked_items';

const DEFAULT_CATEGORIES: ShopCategory[] = [
  {
    icon: '🥚', title: 'ცილა & რძის ნაწარმი',
    items: [
      { id: 1, name: 'კვერცხი (15 ც)', price: '9₾ · ნიკორა', checked: false },
      { id: 2, name: 'Greek Yogurt (0% ან 2%)', price: '30₾ · გუდვილი', checked: false },
      { id: 3, name: 'ქათმის ფილე (Breast) 1500გ', price: '22.5₾ · გუდვ.', checked: false },
      { id: 4, name: 'მჭლე საქონლის ფარში 1400გ', price: '49₾ · აგროჰ.', checked: false },
    ]
  },
  {
    icon: '🥑', title: 'ბოსტნეული & ხილი',
    items: [
      { id: 5, name: 'ავოკადო 4 ც.', price: '15₾ · ლიბრე', checked: false },
      { id: 6, name: 'Cherry Tomatoes 500გ', price: '5₾ · კარფური', checked: false },
      { id: 7, name: 'ისპანახი (Baby Spinach) 500გ', price: '5₾ · ბაზარი', checked: false },
      { id: 8, name: 'ყაბაყი (Zucchini) 700გ', price: '5₾ · ბაზარი', checked: false },
      { id: 9, name: 'Baby Potatoes 1200გ', price: '5₾ · ბაზარი', checked: false },
      { id: 10, name: 'ბულგარული წიწაკა 1000გ', price: '5₾ · ბაზარი', checked: false },
      { id: 11, name: 'წითელი ხახვი 7 ც.', price: '5₾ · ბაზარი', checked: false },
      { id: 12, name: 'ჩია 200–300გ', price: '—', checked: false },
    ]
  },
  {
    icon: '🌾', title: 'მარცვლეული & პური',
    items: [
      { id: 13, name: 'Sourdough პური 2 ც.', price: '8₾ · წერტი', checked: false },
      { id: 14, name: 'Quinoa 700გ', price: '16₾ · ევრო ', checked: false },
    ]
  },
  {
    icon: '🌿', title: 'სანელებლები & სხვა',
    items: [
      { id: 15, name: 'ზეითუნის ზეთი 1 ბოთ.', price: '—', checked: false },
      { id: 16, name: 'Mint (პიტნა) კონა', price: '3₾ · ბაზარი', checked: false },
      { id: 17, name: 'Parsley (ოხრახუში) კონა', price: '3₾ · ბაზარი', checked: false },
      { id: 18, name: 'ლიმონი 2–3 ც.', price: '—', checked: false },
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class ShopService {
  categories = signal<ShopCategory[]>(this.loadFromStorage());

  totalItems = computed(() =>
    this.categories().reduce((sum, cat) => sum + cat.items.length, 0)
  );

  checkedItems = computed(() =>
    this.categories().reduce((sum, cat) => sum + cat.items.filter(i => i.checked).length, 0)
  );

  progressPercent = computed(() => {
    const total = this.totalItems();
    return total > 0 ? Math.round(this.checkedItems() / total * 100) : 0;
  });

  constructor() {
    effect(() => {
      const checkedIds = this.categories()
        .flatMap(cat => cat.items)
        .filter(item => item.checked)
        .map(item => item.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    });
  }

  private loadFromStorage(): ShopCategory[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_CATEGORIES;

      const checkedIds: number[] = JSON.parse(saved);
      const checkedSet = new Set(checkedIds);

      return DEFAULT_CATEGORIES.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({
          ...item,
          checked: checkedSet.has(item.id)
        }))
      }));
    } catch {
      return DEFAULT_CATEGORIES;
    }
  }
  totalPrice = computed(() => {
  const total = this.categories()
    .flatMap(category => category.items)
    .reduce((sum, item) => {

      const match = item.price.match(/[\d.]+/);
      const price = match ? parseFloat(match[0]) : 0;

      return sum + price;
    }, 0);

  return Math.round(total * 100) / 100;
});
remainingPrice = computed(() => {
  const total = this.categories()
    .flatMap(category => category.items)
    .reduce((sum, item) => {
      const match = item.price.match(/[\d.]+/);
      const price = match ? parseFloat(match[0]) : 0;

      return item.checked ? sum : sum + price;
    }, 0);

  return Math.round(total * 100) / 100;
});

  toggleItem(categoryIndex: number, itemId: number) {
    this.categories.update(cats => cats.map((cat, ci) =>
      ci === categoryIndex
        ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item) }
        : cat
    ));
  }

  reset() {
    this.categories.update(cats => cats.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({ ...item, checked: false }))
    })));
  }
}
