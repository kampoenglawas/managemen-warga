import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CivilianManagementSharedModule } from 'app/shared/shared.module';
import { ResidenceComponent } from './residence.component';
import { ResidenceDetailComponent } from './residence-detail.component';
import { ResidenceUpdateComponent } from './residence-update.component';
import { ResidenceDeleteDialogComponent } from './residence-delete-dialog.component';
import { residenceRoute } from './residence.route';

@NgModule({
  imports: [CivilianManagementSharedModule, RouterModule.forChild(residenceRoute)],
  declarations: [ResidenceComponent, ResidenceDetailComponent, ResidenceUpdateComponent, ResidenceDeleteDialogComponent],
  entryComponents: [ResidenceDeleteDialogComponent]
})
export class CivilianManagementResidenceModule {}
