import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { DataService } from './services/data.service';
import { ToastComponent } from './components/toast.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastComponent],
    template: `<router-outlet></router-outlet>
<app-toast />`
})
export class AppComponent implements OnInit {
    private data = inject(DataService);
    private notif = inject(NotificationService);

    ngOnInit(): void {
        setTimeout(() => {
            this.notif.checkVaccineAlerts();
        }, 1500);
    }
}