import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { DataService } from './services/data.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    private data = inject(DataService);
    private notif = inject(NotificationService);

    ngOnInit(): void {
        // Check vaccine alerts after DataService has initialised
        // (the service resolves its async init before rendering children)
        setTimeout(() => {
            this.notif.checkVaccineAlerts();
        }, 1500);
    }
}
