import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppMySuffix } from './app-my-suffix.model';
import { AppMySuffixPopupService } from './app-my-suffix-popup.service';
import { AppMySuffixService } from './app-my-suffix.service';

@Component({
    selector: 'jhi-app-my-suffix-delete-dialog',
    templateUrl: './app-my-suffix-delete-dialog.component.html'
})
export class AppMySuffixDeleteDialogComponent {

    app: AppMySuffix;

    constructor(
        private appService: AppMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'appListModification',
                content: 'Deleted an app'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-app-my-suffix-delete-popup',
    template: ''
})
export class AppMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appPopupService: AppMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appPopupService
                .open(AppMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
