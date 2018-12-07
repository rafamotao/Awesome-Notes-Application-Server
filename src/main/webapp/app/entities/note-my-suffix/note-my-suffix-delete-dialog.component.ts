import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NoteMySuffix } from './note-my-suffix.model';
import { NoteMySuffixPopupService } from './note-my-suffix-popup.service';
import { NoteMySuffixService } from './note-my-suffix.service';

@Component({
    selector: 'jhi-note-my-suffix-delete-dialog',
    templateUrl: './note-my-suffix-delete-dialog.component.html'
})
export class NoteMySuffixDeleteDialogComponent {

    note: NoteMySuffix;

    constructor(
        private noteService: NoteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.noteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'noteListModification',
                content: 'Deleted an note'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-note-my-suffix-delete-popup',
    template: ''
})
export class NoteMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notePopupService: NoteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notePopupService
                .open(NoteMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
