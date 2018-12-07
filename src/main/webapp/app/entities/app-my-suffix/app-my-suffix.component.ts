import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppMySuffix } from './app-my-suffix.model';
import { AppMySuffixService } from './app-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-app-my-suffix',
    templateUrl: './app-my-suffix.component.html'
})
export class AppMySuffixComponent implements OnInit, OnDestroy {
apps: AppMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private appService: AppMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.appService.query().subscribe(
            (res: ResponseWrapper) => {
                this.apps = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInApps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AppMySuffix) {
        return item.id;
    }
    registerChangeInApps() {
        this.eventSubscriber = this.eventManager.subscribe('appListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
