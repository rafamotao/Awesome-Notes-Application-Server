import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyServerSharedModule } from '../../shared';
import {
    AppMySuffixService,
    AppMySuffixPopupService,
    AppMySuffixComponent,
    AppMySuffixDetailComponent,
    AppMySuffixDialogComponent,
    AppMySuffixPopupComponent,
    AppMySuffixDeletePopupComponent,
    AppMySuffixDeleteDialogComponent,
    appRoute,
    appPopupRoute,
} from './';

const ENTITY_STATES = [
    ...appRoute,
    ...appPopupRoute,
];

@NgModule({
    imports: [
        MyServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AppMySuffixComponent,
        AppMySuffixDetailComponent,
        AppMySuffixDialogComponent,
        AppMySuffixDeleteDialogComponent,
        AppMySuffixPopupComponent,
        AppMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AppMySuffixComponent,
        AppMySuffixDialogComponent,
        AppMySuffixPopupComponent,
        AppMySuffixDeleteDialogComponent,
        AppMySuffixDeletePopupComponent,
    ],
    providers: [
        AppMySuffixService,
        AppMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyServerAppMySuffixModule {}
