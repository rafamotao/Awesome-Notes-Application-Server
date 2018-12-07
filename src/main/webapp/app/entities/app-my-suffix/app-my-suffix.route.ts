import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AppMySuffixComponent } from './app-my-suffix.component';
import { AppMySuffixDetailComponent } from './app-my-suffix-detail.component';
import { AppMySuffixPopupComponent } from './app-my-suffix-dialog.component';
import { AppMySuffixDeletePopupComponent } from './app-my-suffix-delete-dialog.component';

export const appRoute: Routes = [
    {
        path: 'app-my-suffix',
        component: AppMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.app.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'app-my-suffix/:id',
        component: AppMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.app.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appPopupRoute: Routes = [
    {
        path: 'app-my-suffix-new',
        component: AppMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.app.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'app-my-suffix/:id/edit',
        component: AppMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.app.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'app-my-suffix/:id/delete',
        component: AppMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.app.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
