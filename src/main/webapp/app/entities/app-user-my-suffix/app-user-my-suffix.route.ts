import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AppUserMySuffixComponent } from './app-user-my-suffix.component';
import { AppUserMySuffixDetailComponent } from './app-user-my-suffix-detail.component';
import { AppUserMySuffixPopupComponent } from './app-user-my-suffix-dialog.component';
import { AppUserMySuffixDeletePopupComponent } from './app-user-my-suffix-delete-dialog.component';

export const appUserRoute: Routes = [
    {
        path: 'app-user-my-suffix',
        component: AppUserMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.appUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'app-user-my-suffix/:id',
        component: AppUserMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.appUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appUserPopupRoute: Routes = [
    {
        path: 'app-user-my-suffix-new',
        component: AppUserMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.appUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'app-user-my-suffix/:id/edit',
        component: AppUserMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.appUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'app-user-my-suffix/:id/delete',
        component: AppUserMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myServerApp.appUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
