import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppUserMySuffix } from './app-user-my-suffix.model';
import { AppUserMySuffixService } from './app-user-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-app-user-my-suffix',
    templateUrl: './app-user-my-suffix.component.html'
})
export class AppUserMySuffixComponent implements OnInit, OnDestroy {
appUsers: AppUserMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private appUserService: AppUserMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.appUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.appUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAppUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AppUserMySuffix) {
        return item.id;
    }
    registerChangeInAppUsers() {
        this.eventSubscriber = this.eventManager.subscribe('appUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
