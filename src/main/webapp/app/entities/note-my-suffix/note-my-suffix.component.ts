import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NoteMySuffix } from './note-my-suffix.model';
import { NoteMySuffixService } from './note-my-suffix.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-note-my-suffix',
    templateUrl: './note-my-suffix.component.html'
})
export class NoteMySuffixComponent implements OnInit, OnDestroy {
notes: NoteMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private noteService: NoteMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.noteService.query().subscribe(
            (res: ResponseWrapper) => {
                this.notes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NoteMySuffix) {
        return item.id;
    }
    registerChangeInNotes() {
        this.eventSubscriber = this.eventManager.subscribe('noteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
