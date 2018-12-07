/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyServerTestModule } from '../../../test.module';
import { NoteMySuffixComponent } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.component';
import { NoteMySuffixService } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.service';
import { NoteMySuffix } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.model';

describe('Component Tests', () => {

    describe('NoteMySuffix Management Component', () => {
        let comp: NoteMySuffixComponent;
        let fixture: ComponentFixture<NoteMySuffixComponent>;
        let service: NoteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [NoteMySuffixComponent],
                providers: [
                    NoteMySuffixService
                ]
            })
            .overrideTemplate(NoteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new NoteMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
