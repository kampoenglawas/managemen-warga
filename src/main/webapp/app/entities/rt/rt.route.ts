import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRT, RT } from 'app/shared/model/rt.model';
import { RTService } from './rt.service';
import { RTComponent } from './rt.component';
import { RTDetailComponent } from './rt-detail.component';
import { RTUpdateComponent } from './rt-update.component';

@Injectable({ providedIn: 'root' })
export class RTResolve implements Resolve<IRT> {
  constructor(private service: RTService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRT> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rT: HttpResponse<RT>) => {
          if (rT.body) {
            return of(rT.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RT());
  }
}

export const rTRoute: Routes = [
  {
    path: '',
    component: RTComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'civilianManagementApp.rT.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RTDetailComponent,
    resolve: {
      rT: RTResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.rT.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RTUpdateComponent,
    resolve: {
      rT: RTResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.rT.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RTUpdateComponent,
    resolve: {
      rT: RTResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.rT.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
