import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyServerSharedModule } from '../../shared';
import {
    AppUserMySuffixService,
    AppUserMySuffixPopupService,
    AppUserMySuffixComponent,
    AppUserMySuffixDetailComponent,
    AppUserMySuffixDialogComponent,
    AppUserMySuffixPopupComponent,
    AppUserMySuffixDeletePopupComponent,
    AppUserMySuffixDeleteDialogComponent,
    appUserRoute,
    appUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...appUserRoute,
    ...appUserPopupRoute,
];

@NgModule({
    imports: [
        MyServerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AppUserMySuffixComponent,
        AppUserMySuffixDetailComponent,
        AppUserMySuffixDialogComponent,
        AppUserMySuffixDeleteDialogComponent,
        AppUserMySuffixPopupComponent,
        AppUserMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AppUserMySuffixComponent,
        AppUserMySuffixDialogComponent,
        AppUserMySuffixPopupComponent,
        AppUserMySuffixDeleteDialogComponent,
        AppUserMySuffixDeletePopupComponent,
    ],
    providers: [
        AppUserMySuffixService,
        AppUserMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyServerAppUserMySuffixModule {}
