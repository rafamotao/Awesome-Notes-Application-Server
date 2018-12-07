/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyServerTestModule } from '../../../test.module';
import { AppMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix-dialog.component';
import { AppMySuffixService } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.service';
import { AppMySuffix } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.model';
import { AppUserMySuffixService } from '../../../../../../main/webapp/app/entities/app-user-my-suffix';

describe('Component Tests', () => {

    describe('AppMySuffix Management Dialog Component', () => {
        let comp: AppMySuffixDialogComponent;
        let fixture: ComponentFixture<AppMySuffixDialogComponent>;
        let service: AppMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppMySuffixDialogComponent],
                providers: [
                    AppUserMySuffixService,
                    AppMySuffixService
                ]
            })
            .overrideTemplate(AppMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AppMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.app = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'appListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AppMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.app = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'appListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
