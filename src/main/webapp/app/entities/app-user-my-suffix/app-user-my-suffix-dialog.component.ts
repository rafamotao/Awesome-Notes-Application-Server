import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppUserMySuffix } from './app-user-my-suffix.model';
import { AppUserMySuffixPopupService } from './app-user-my-suffix-popup.service';
import { AppUserMySuffixService } from './app-user-my-suffix.service';
import { AppMySuffix, AppMySuffixService } from '../app-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-app-user-my-suffix-dialog',
    templateUrl: './app-user-my-suffix-dialog.component.html'
})
export class AppUserMySuffixDialogComponent implements OnInit {

    appUser: AppUserMySuffix;
    isSaving: boolean;

    apps: AppMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private appUserService: AppUserMySuffixService,
        private appService: AppMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.appService.query()
            .subscribe((res: ResponseWrapper) => { this.apps = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.appUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.appUserService.update(this.appUser));
        } else {
            this.subscribeToSaveResponse(
                this.appUserService.create(this.appUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<AppUserMySuffix>) {
        result.subscribe((res: AppUserMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AppUserMySuffix) {
        this.eventManager.broadcast({ name: 'appUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAppById(index: number, item: AppMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-app-user-my-suffix-popup',
    template: ''
})
export class AppUserMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appUserPopupService: AppUserMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appUserPopupService
                    .open(AppUserMySuffixDialogComponent as Component, params['id']);
            } else {
                this.appUserPopupService
                    .open(AppUserMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
