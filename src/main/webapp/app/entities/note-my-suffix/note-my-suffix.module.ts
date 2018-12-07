import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyServerSharedModule } from '../../shared';
import {
    NoteMySuffixService,
    NoteMySuffixPopupService,
    NoteMySuffixComponent,
    NoteMySuffixDetailComponent,
    NoteMySuffixDialogComponent,
    NoteMySuffixPopupComponent,
    NoteMySuffixDeletePopupComponent,
    NoteMySuffixDeleteDialogComponent,
    noteRoute,
    notePopupRoute,
} from './';

const ENTITY_STATES = [
    ...noteRoute,
    ...notePopupRoute,
];

@NgModule({
    imports: [
        MyServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NoteMySuffixComponent,
        NoteMySuffixDetailComponent,
        NoteMySuffixDialogComponent,
        NoteMySuffixDeleteDialogComponent,
        NoteMySuffixPopupComponent,
        NoteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        NoteMySuffixComponent,
        NoteMySuffixDialogComponent,
        NoteMySuffixPopupComponent,
        NoteMySuffixDeleteDialogComponent,
        NoteMySuffixDeletePopupComponent,
    ],
    providers: [
        NoteMySuffixService,
        NoteMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyServerNoteMySuffixModule {}
