import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CivilianManagementSharedModule } from 'app/shared/shared.module';
import { PovertyCivilianComponent } from './poverty-civilian.component';
import { PovertyCivilianDetailComponent } from './poverty-civilian-detail.component';
import { PovertyCivilianUpdateComponent } from './poverty-civilian-update.component';
import { PovertyCivilianDeleteDialogComponent } from './poverty-civilian-delete-dialog.component';
import { povertyCivilianRoute } from './poverty-civilian.route';

@NgModule({
  imports: [CivilianManagementSharedModule, RouterModule.forChild(povertyCivilianRoute)],
  declarations: [
    PovertyCivilianComponent,
    PovertyCivilianDetailComponent,
    PovertyCivilianUpdateComponent,
    PovertyCivilianDeleteDialogComponent
  ],
  entryComponents: [PovertyCivilianDeleteDialogComponent]
})
export class CivilianManagementPovertyCivilianModule {}
