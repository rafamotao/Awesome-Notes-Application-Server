/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyServerTestModule } from '../../../test.module';
import { AppUserMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix-delete-dialog.component';
import { AppUserMySuffixService } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.service';

describe('Component Tests', () => {

    describe('AppUserMySuffix Management Delete Component', () => {
        let comp: AppUserMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AppUserMySuffixDeleteDialogComponent>;
        let service: AppUserMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppUserMySuffixDeleteDialogComponent],
                providers: [
                    AppUserMySuffixService
                ]
            })
            .overrideTemplate(AppUserMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppUserMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUserMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
