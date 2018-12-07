/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyServerTestModule } from '../../../test.module';
import { NoteMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix-dialog.component';
import { NoteMySuffixService } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.service';
import { NoteMySuffix } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.model';
import { AppUserMySuffixService } from '../../../../../../main/webapp/app/entities/app-user-my-suffix';

describe('Component Tests', () => {

    describe('NoteMySuffix Management Dialog Component', () => {
        let comp: NoteMySuffixDialogComponent;
        let fixture: ComponentFixture<NoteMySuffixDialogComponent>;
        let service: NoteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [NoteMySuffixDialogComponent],
                providers: [
                    AppUserMySuffixService,
                    NoteMySuffixService
                ]
            })
            .overrideTemplate(NoteMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoteMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NoteMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.note = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'noteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NoteMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.note = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'noteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
