import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IResidence, Residence } from 'app/shared/model/residence.model';
import { ResidenceService } from './residence.service';
import { ResidenceComponent } from './residence.component';
import { ResidenceDetailComponent } from './residence-detail.component';
import { ResidenceUpdateComponent } from './residence-update.component';

@Injectable({ providedIn: 'root' })
export class ResidenceResolve implements Resolve<IResidence> {
  constructor(private service: ResidenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResidence> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((residence: HttpResponse<Residence>) => {
          if (residence.body) {
            return of(residence.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Residence());
  }
}

export const residenceRoute: Routes = [
  {
    path: '',
    component: ResidenceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'civilianManagementApp.residence.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ResidenceDetailComponent,
    resolve: {
      residence: ResidenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.residence.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ResidenceUpdateComponent,
    resolve: {
      residence: ResidenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.residence.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ResidenceUpdateComponent,
    resolve: {
      residence: ResidenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.residence.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
