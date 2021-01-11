import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CivilianManagementSharedModule } from 'app/shared/shared.module';
import { CivilianComponent } from './civilian.component';
import { CivilianDetailComponent } from './civilian-detail.component';
import { CivilianUpdateComponent } from './civilian-update.component';
import { CivilianDeleteDialogComponent } from './civilian-delete-dialog.component';
import { civilianRoute } from './civilian.route';

@NgModule({
  imports: [CivilianManagementSharedModule, RouterModule.forChild(civilianRoute)],
  declarations: [CivilianComponent, CivilianDetailComponent, CivilianUpdateComponent, CivilianDeleteDialogComponent],
  entryComponents: [CivilianDeleteDialogComponent]
})
export class CivilianManagementCivilianModule {}
