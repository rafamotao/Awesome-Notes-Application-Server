import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AppUserMySuffix } from './app-user-my-suffix.model';
import { AppUserMySuffixService } from './app-user-my-suffix.service';

@Component({
    selector: 'jhi-app-user-my-suffix-detail',
    templateUrl: './app-user-my-suffix-detail.component.html'
})
export class AppUserMySuffixDetailComponent implements OnInit, OnDestroy {

    appUser: AppUserMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private appUserService: AppUserMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAppUsers();
    }

    load(id) {
        this.appUserService.find(id).subscribe((appUser) => {
            this.appUser = appUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAppUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'appUserListModification',
            (response) => this.load(this.appUser.id)
        );
    }
}
