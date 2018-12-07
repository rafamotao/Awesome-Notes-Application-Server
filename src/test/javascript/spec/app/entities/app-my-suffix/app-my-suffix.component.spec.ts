/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyServerTestModule } from '../../../test.module';
import { AppMySuffixComponent } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.component';
import { AppMySuffixService } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.service';
import { AppMySuffix } from '../../../../../../main/webapp/app/entities/app-my-suffix/app-my-suffix.model';

describe('Component Tests', () => {

    describe('AppMySuffix Management Component', () => {
        let comp: AppMySuffixComponent;
        let fixture: ComponentFixture<AppMySuffixComponent>;
        let service: AppMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [AppMySuffixComponent],
                providers: [
                    AppMySuffixService
                ]
            })
            .overrideTemplate(AppMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AppMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.apps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
