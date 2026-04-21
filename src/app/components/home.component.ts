import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeHeroComponent } from './home/welcome-hero.component';
import { QuickActionsGridComponent } from './home/quick-actions-grid.component';
import { HealthAlertCardComponent } from './home/health-alert-card.component';
import { RecentActivityFeedComponent } from './home/recent-activity-feed.component';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        WelcomeHeroComponent,
        QuickActionsGridComponent,
        HealthAlertCardComponent,
        RecentActivityFeedComponent,
    ],
    template: `
    <div class="px-2 max-w-6xl mx-auto">
      <app-welcome-hero />
      <app-quick-actions-grid />
      <app-health-alert-card />
      <app-recent-activity-feed />
    </div>
  `,
    styles: [`
      :host { display: block; }
    `]
})
export class HomeComponent {}