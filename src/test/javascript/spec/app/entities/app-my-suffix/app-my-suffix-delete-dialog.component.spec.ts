/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyServerTestModule } from '../../../test.module';
import { AppMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix-delete-dialog.component';
import { AppMySuffixService } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.service';

describe('Component Tests', () => {

    describe('AppMySuffix Management Delete Component', () => {
        let comp: AppMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AppMySuffixDeleteDialogComponent>;
        let service: AppMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppMySuffixDeleteDialogComponent],
                providers: [
                    AppMySuffixService
                ]
            })
            .overrideTemplate(AppMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppMySuffixService);
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
