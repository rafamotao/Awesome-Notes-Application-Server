import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NoteMySuffix } from './note-my-suffix.model';
import { NoteMySuffixService } from './note-my-suffix.service';

@Component({
    selector: 'jhi-note-my-suffix-detail',
    templateUrl: './note-my-suffix-detail.component.html'
})
export class NoteMySuffixDetailComponent implements OnInit, OnDestroy {

    note: NoteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private noteService: NoteMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotes();
    }

    load(id) {
        this.noteService.find(id).subscribe((note) => {
            this.note = note;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'noteListModification',
            (response) => this.load(this.note.id)
        );
    }
}
