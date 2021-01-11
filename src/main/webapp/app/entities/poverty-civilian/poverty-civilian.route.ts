import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPovertyCivilian, PovertyCivilian } from 'app/shared/model/poverty-civilian.model';
import { PovertyCivilianService } from './poverty-civilian.service';
import { PovertyCivilianComponent } from './poverty-civilian.component';
import { PovertyCivilianDetailComponent } from './poverty-civilian-detail.component';
import { PovertyCivilianUpdateComponent } from './poverty-civilian-update.component';

@Injectable({ providedIn: 'root' })
export class PovertyCivilianResolve implements Resolve<IPovertyCivilian> {
  constructor(private service: PovertyCivilianService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPovertyCivilian> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((povertyCivilian: HttpResponse<PovertyCivilian>) => {
          if (povertyCivilian.body) {
            return of(povertyCivilian.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PovertyCivilian());
  }
}

export const povertyCivilianRoute: Routes = [
  {
    path: '',
    component: PovertyCivilianComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'civilianManagementApp.povertyCivilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PovertyCivilianDetailComponent,
    resolve: {
      povertyCivilian: PovertyCivilianResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.povertyCivilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PovertyCivilianUpdateComponent,
    resolve: {
      povertyCivilian: PovertyCivilianResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.povertyCivilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PovertyCivilianUpdateComponent,
    resolve: {
      povertyCivilian: PovertyCivilianResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'civilianManagementApp.povertyCivilian.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
