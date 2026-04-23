import { Component } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { WelcomeHeroComponent } from './home/welcome-hero.component';
import { QuickActionsGridComponent } from './home/quick-actions-grid.component';
import { HealthAlertCardComponent } from './home/health-alert-card.component';
import { RecentActivityFeedComponent } from './home/recent-activity-feed.component';
import { GrowthChartComponent } from './growth-chart/growth-chart.component';

@Component({
    selector: 'app-home',
    imports: [CommonModule, LucideAngularModule, WelcomeHeroComponent, QuickActionsGridComponent, HealthAlertCardComponent, RecentActivityFeedComponent, GrowthChartComponent],
    template: `
    <div class="px-2 max-w-6xl mx-auto">
      <app-welcome-hero />
      <app-quick-actions-grid />
      <app-health-alert-card />
      <app-growth-chart />
      <app-recent-activity-feed />
    </div>
  `,
    styles: [`
      :host { display: block; }
    `]
})
export class HomeComponent {}