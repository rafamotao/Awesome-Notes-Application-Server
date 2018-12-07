import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NoteMySuffixComponent } from './note-my-suffix.component';
import { NoteMySuffixDetailComponent } from './note-my-suffix-detail.component';
import { NoteMySuffixPopupComponent } from './note-my-suffix-dialog.component';
import { NoteMySuffixDeletePopupComponent } from './note-my-suffix-delete-dialog.component';

export const noteRoute: Routes = [
    {
        path: 'note-my-suffix',
        component: NoteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'note-my-suffix/:id',
        component: NoteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notePopupRoute: Routes = [
    {
        path: 'note-my-suffix-new',
        component: NoteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.note.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'note-my-suffix/:id/edit',
        component: NoteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.note.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'note-my-suffix/:id/delete',
        component: NoteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.note.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
