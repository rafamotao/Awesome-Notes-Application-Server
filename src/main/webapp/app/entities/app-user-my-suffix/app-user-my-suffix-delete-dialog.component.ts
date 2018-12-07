import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppUserMySuffix } from './app-user-my-suffix.model';
import { AppUserMySuffixPopupService } from './app-user-my-suffix-popup.service';
import { AppUserMySuffixService } from './app-user-my-suffix.service';

@Component({
    selector: 'jhi-app-user-my-suffix-delete-dialog',
    templateUrl: './app-user-my-suffix-delete-dialog.component.html'
})
export class AppUserMySuffixDeleteDialogComponent {

    appUser: AppUserMySuffix;

    constructor(
        private appUserService: AppUserMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'appUserListModification',
                content: 'Deleted an appUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-app-user-my-suffix-delete-popup',
    template: ''
})
export class AppUserMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appUserPopupService: AppUserMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appUserPopupService
                .open(AppUserMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
