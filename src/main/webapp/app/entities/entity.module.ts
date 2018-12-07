import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyServerAppUserMySuffixModule } from './app-user-my-suffix/app-user-my-suffix.module';
import { MyServerAppMySuffixModule } from './app-my-suffix/app-my-suffix.module';
import { MyServerNoteMySuffixModule } from './note-my-suffix/note-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyServerAppUserMySuffixModule,
        MyServerAppMySuffixModule,
        MyServerNoteMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyServerEntityModule {}
