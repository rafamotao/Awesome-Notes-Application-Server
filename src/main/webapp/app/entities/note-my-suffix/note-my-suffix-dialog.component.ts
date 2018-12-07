import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NoteMySuffix } from './note-my-suffix.model';
import { NoteMySuffixPopupService } from './note-my-suffix-popup.service';
import { NoteMySuffixService } from './note-my-suffix.service';
import { AppUserMySuffix, AppUserMySuffixService } from '../app-user-my-suffix';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-note-my-suffix-dialog',
    templateUrl: './note-my-suffix-dialog.component.html'
})
export class NoteMySuffixDialogComponent implements OnInit {

    note: NoteMySuffix;
    isSaving: boolean;

    appusers: AppUserMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private noteService: NoteMySuffixService,
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
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(
                this.noteService.update(this.note));
        } else {
            this.subscribeToSaveResponse(
                this.noteService.create(this.note));
        }
    }

    private subscribeToSaveResponse(result: Observable<NoteMySuffix>) {
        result.subscribe((res: NoteMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: NoteMySuffix) {
        this.eventManager.broadcast({ name: 'noteListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-note-my-suffix-popup',
    template: ''
})
export class NoteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notePopupService: NoteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notePopupService
                    .open(NoteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.notePopupService
                    .open(NoteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
