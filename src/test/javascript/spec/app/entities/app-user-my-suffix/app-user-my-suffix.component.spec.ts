/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyServerTestModule } from '../../../test.module';
import { AppUserMySuffixComponent } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.component';
import { AppUserMySuffixService } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.service';
import { AppUserMySuffix } from '../../../../../../main/webapp/app/entities/app-user-my-suffix/app-user-my-suffix.model';

describe('Component Tests', () => {

    describe('AppUserMySuffix Management Component', () => {
        let comp: AppUserMySuffixComponent;
        let fixture: ComponentFixture<AppUserMySuffixComponent>;
        let service: AppUserMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppUserMySuffixComponent],
                providers: [
                    AppUserMySuffixService
                ]
            })
            .overrideTemplate(AppUserMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppUserMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUserMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AppUserMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.appUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
