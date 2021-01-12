import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { CivilianManagementSharedLibsModule } from 'app/shared/shared-libs.module';
import { CivilianManagementSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CivilianManagementSharedLibsModule, RouterModule.forChild([HOME_ROUTE]), CivilianManagementSharedModule],
  declarations: [HomeComponent]
})
export class CivilianManagementHomeModule {}
