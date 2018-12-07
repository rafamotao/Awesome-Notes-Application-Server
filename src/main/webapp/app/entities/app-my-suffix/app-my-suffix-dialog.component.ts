import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppMySuffix } from './app-my-suffix.model';
import { AppMySuffixPopupService } from './app-my-suffix-popup.service';
import { AppMySuffixService } from './app-my-suffix.service';
import { AppUserMySuffix, AppUserMySuffixService } from '../app-user-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-app-my-suffix-dialog',
    templateUrl: './app-my-suffix-dialog.component.html'
})
export class AppMySuffixDialogComponent implements OnInit {

    app: AppMySuffix;
    isSaving: boolean;

    appusers: AppUserMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private appService: AppMySuffixService,
        private appUserService: AppUserMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.appUserService.query()
            .subscribe((res: ResponseWrapper) => { this.appusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.app.id !== undefined) {
            this.subscribeToSaveResponse(
                this.appService.update(this.app));
        } else {
            this.subscribeToSaveResponse(
                this.appService.create(this.app));
        }
    }

    private subscribeToSaveResponse(result: Observable<AppMySuffix>) {
        result.subscribe((res: AppMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AppMySuffix) {
        this.eventManager.broadcast({ name: 'appListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAppUserById(index: number, item: AppUserMySuffix) {
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
    selector: 'jhi-app-my-suffix-popup',
    template: ''
})
export class AppMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appPopupService: AppMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appPopupService
                    .open(AppMySuffixDialogComponent as Component, params['id']);
            } else {
                this.appPopupService
                    .open(AppMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
