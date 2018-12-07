/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyServerTestModule } from '../../../test.module';
import { NoteMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix-detail.component';
import { NoteMySuffixService } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.service';
import { NoteMySuffix } from '../../../../../../main/webapp/app/entities/note-my-suffix/note-my-suffix.model';

describe('Component Tests', () => {

    describe('NoteMySuffix Management Detail Component', () => {
        let comp: NoteMySuffixDetailComponent;
        let fixture: ComponentFixture<NoteMySuffixDetailComponent>;
        let service: NoteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyServerTestModule],
                declarations: [NoteMySuffixDetailComponent],
                providers: [
                    NoteMySuffixService
                ]
            })
            .overrideTemplate(NoteMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NoteMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new NoteMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.note).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
