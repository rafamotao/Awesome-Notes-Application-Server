/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyServerTestModule } from '../../../test.module';
import { AppUserMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix-dialog.component';
import { AppUserMySuffixService } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.service';
import { AppUserMySuffix } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.model';
import { AppMySuffixService } from '../../../../../../main/webapp/app/entities/app-my-suffix';

describe('Component Tests', () => {

    describe('AppUserMySuffix Management Dialog Component', () => {
        let comp: AppUserMySuffixDialogComponent;
        let fixture: ComponentFixture<AppUserMySuffixDialogComponent>;
        let service: AppUserMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppUserMySuffixDialogComponent],
                providers: [
                    AppMySuffixService,
                    AppUserMySuffixService
                ]
            })
            .overrideTemplate(AppUserMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppUserMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUserMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AppUserMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.appUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'appUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AppUserMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.appUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'appUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
