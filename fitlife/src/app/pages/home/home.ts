import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  currentDate = '';

  schedule = [
    { day: 'ორშაბათი', type: 'cardio', label: '🏃 კარდიო', badgeClass: 'badge-cardio' },
    { day: 'სამშაბათი', type: 'gym', label: '🏋️ Gym', badgeClass: 'badge-gym' },
    { day: 'ოთხშაბათი', type: 'pool', label: '🏊 აუზი', badgeClass: 'badge-pool' },
    { day: 'ხუთშაბათი', type: 'gym', label: '🏋️ Gym', badgeClass: 'badge-gym' },
    { day: 'პარასკევი', type: 'cardio', label: '🏃 კარდიო', badgeClass: 'badge-cardio' },
    { day: 'შაბათი', type: 'pool', label: '🏊 აუზი', badgeClass: 'badge-pool' },
    { day: 'კვირა', type: 'rest', label: '😴 დასვენება', badgeClass: 'badge-rest' },
  ];

  constructor(public shopService: ShopService) {}

  ngOnInit() {
    const now = new Date();
    const days = ['კვირა','ორშაბათი','სამშაბათი','ოთხშაბათი','ხუთშაბათი','პარასკევი','შაბათი'];
    const months = ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი','ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'];
    this.currentDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  }
}
