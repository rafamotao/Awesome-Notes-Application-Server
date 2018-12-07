/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyServerTestModule } from '../../../test.module';
import { AppMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix-detail.component';
import { AppMySuffixService } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.service';
import { AppMySuffix } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.model';

describe('Component Tests', () => {

    describe('AppMySuffix Management Detail Component', () => {
        let comp: AppMySuffixDetailComponent;
        let fixture: ComponentFixture<AppMySuffixDetailComponent>;
        let service: AppMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppMySuffixDetailComponent],
                providers: [
                    AppMySuffixService
                ]
            })
            .overrideTemplate(AppMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AppMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.app).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
