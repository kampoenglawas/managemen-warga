import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'rt',
        loadChildren: () => import('./rt/rt.module').then(m => m.CivilianManagementRTModule)
      },
      {
        path: 'civilian',
        loadChildren: () => import('./civilian/civilian.module').then(m => m.CivilianManagementCivilianModule)
      },
      {
        path: 'benefit',
        loadChildren: () => import('./benefit/benefit.module').then(m => m.CivilianManagementBenefitModule)
      },
      {
        path: 'family-member',
        loadChildren: () => import('./family-member/family-member.module').then(m => m.CivilianManagementFamilyMemberModule)
      },
      {
        path: 'family',
        loadChildren: () => import('./family/family.module').then(m => m.CivilianManagementFamilyModule)
      },
      {
        path: 'residence',
        loadChildren: () => import('./residence/residence.module').then(m => m.CivilianManagementResidenceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CivilianManagementEntityModule {}
