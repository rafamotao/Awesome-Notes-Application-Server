import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AppMySuffix } from './app-my-suffix.model';
import { AppMySuffixService } from './app-my-suffix.service';

@Component({
    selector: 'jhi-app-my-suffix-detail',
    templateUrl: './app-my-suffix-detail.component.html'
})
export class AppMySuffixDetailComponent implements OnInit, OnDestroy {

    app: AppMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private appService: AppMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInApps();
    }

    load(id) {
        this.appService.find(id).subscribe((app) => {
            this.app = app;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInApps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'appListModification',
            (response) => this.load(this.app.id)
        );
    }
}
