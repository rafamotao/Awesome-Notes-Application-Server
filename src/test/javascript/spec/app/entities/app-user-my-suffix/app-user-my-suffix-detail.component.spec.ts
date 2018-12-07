/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyServerTestModule } from '../../../test.module';
import { AppUserMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix-detail.component';
import { AppUserMySuffixService } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.service';
import { AppUserMySuffix } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.model';

describe('Component Tests', () => {

    describe('AppUserMySuffix Management Detail Component', () => {
        let comp: AppUserMySuffixDetailComponent;
        let fixture: ComponentFixture<AppUserMySuffixDetailComponent>;
        let service: AppUserMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppUserMySuffixDetailComponent],
                providers: [
                    AppUserMySuffixService
                ]
            })
            .overrideTemplate(AppUserMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppUserMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUserMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AppUserMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.appUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
