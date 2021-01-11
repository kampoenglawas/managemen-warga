import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CivilianManagementSharedModule } from 'app/shared/shared.module';
import { RTComponent } from './rt.component';
import { RTDetailComponent } from './rt-detail.component';
import { RTUpdateComponent } from './rt-update.component';
import { RTDeleteDialogComponent } from './rt-delete-dialog.component';
import { rTRoute } from './rt.route';

@NgModule({
  imports: [CivilianManagementSharedModule, RouterModule.forChild(rTRoute)],
  declarations: [RTComponent, RTDetailComponent, RTUpdateComponent, RTDeleteDialogComponent],
  entryComponents: [RTDeleteDialogComponent]
})
export class CivilianManagementRTModule {}
