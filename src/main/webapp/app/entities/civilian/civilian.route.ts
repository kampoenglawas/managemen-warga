import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICivilian, Civilian } from 'app/shared/model/civilian.model';
import { CivilianService } from './civilian.service';
import { CivilianComponent } from './civilian.component';
import { CivilianDetailComponent } from './civilian-detail.component';
import { CivilianUpdateComponent } from './civilian-update.component';

@Injectable({ providedIn: 'root' })
export class CivilianResolve implements Resolve<ICivilian> {
  constructor(private service: CivilianService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICivilian> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((civilian: HttpResponse<Civilian>) => {
          if (civilian.body) {
            return of(civilian.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Civilian());
  }
}

export const civilianRoute: Routes = [
  {
    path: '',
    component: CivilianComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'civilianManagementApp.civilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CivilianDetailComponent,
    resolve: {
      civilian: CivilianResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.civilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CivilianUpdateComponent,
    resolve: {
      civilian: CivilianResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.civilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CivilianUpdateComponent,
    resolve: {
      civilian: CivilianResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.civilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
