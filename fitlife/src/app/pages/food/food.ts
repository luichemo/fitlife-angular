import { Component } from '@angular/core';

export interface Meal {
  time: string;
  timeLabel: string;
  badgeColor: string;
  badgeText: string;
  title: string;
  image: string;
  calories: number;
  ingredients: { name: string; amount: string }[];
  macros: { protein: string; carbs: string; fat: string };
  open: boolean;
}

@Component({
  selector: 'app-food',
  standalone: true,
  templateUrl: './food.html',
})
export class FoodComponent {
  meals: Meal[] = [
    {
      time: '☀️ დილა', timeLabel: 'საუზმე',
      badgeColor: 'rgba(200,241,53,0.2)', badgeText: '#c8f135',
      title: 'Poached Eggs & Avocado',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      calories: 490,
      ingredients: [
        { name: '🥚 კვერცხი (L ზომა)', amount: '2 ცალი' },
        { name: '🥑 ავოკადო', amount: '70გ' },
        { name: '🍞 Sourdough პური', amount: '1 ნაჭ (45გ)' },
        { name: '🍅 Cherry Tomatoes', amount: '100გ' },
        { name: '🥬 ისპანახი', amount: 'გემოვნებით' },
      ],
      macros: { protein: '~28გ', carbs: '~35გ', fat: '~25გ' },
      open: false
    },
    {
      time: '🕛 შუადღე', timeLabel: 'სადილი',
      badgeColor: 'rgba(71,253,164,0.2)', badgeText: '#47fda4',
      title: 'Beef & Herb Patties',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
      calories: 570,
      ingredients: [
        { name: '🥩 მჭლე საქონლის ფარში', amount: '200გ' },
        { name: '🥒 ყაბაყი (გახეხილი)', amount: '100გ' },
        { name: '🌾 Quinoa (მოხ.)', amount: '100გ' },
        { name: '🌿 Mint & Parsley', amount: 'გემოვნებით' },
      ],
      macros: { protein: '~55გ', carbs: '~40გ', fat: '~18გ' },
      open: false
    },
    {
      time: '🌙 საღამო', timeLabel: 'ვახშამი',
      badgeColor: 'rgba(255,140,53,0.2)', badgeText: '#ff8c35',
      title: 'Lemon Roast Chicken',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
      calories: 580,
      ingredients: [
        { name: '🍗 ქათმის ფილე', amount: '200გ' },
        { name: '🥔 Baby Potatoes', amount: '150გ' },
        { name: '🫑 ბულგარული წიწაკა', amount: '150გ' },
        { name: '🧅 წითელი ხახვი', amount: '1 საშ. თავი' },
        { name: '🫒 ზეითუნის ზეთი', amount: '1 ჩ/კ' },
      ],
      macros: { protein: '~52გ', carbs: '~60გ', fat: '~8გ' },
      open: false
    },
    {
      time: '🍓 სნეკი', timeLabel: 'სნეკი',
      badgeColor: 'rgba(71,253,164,0.2)', badgeText: '#47fda4',
      title: 'Greek Yogurt & Berries',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      calories: 240,
      ingredients: [
        { name: '🥛 Greek Yogurt (0–2%)', amount: '250გ' },
        { name: '🫐 ჩია', amount: '100გ' },
      ],
      macros: { protein: '~25გ', carbs: '~20გ', fat: '~4გ' },
      open: false
    },
  ];

  toggleMeal(meal: Meal) {
    meal.open = !meal.open;
  }
}
