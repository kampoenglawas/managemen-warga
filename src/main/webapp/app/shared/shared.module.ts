import { NgModule } from '@angular/core';
import { CivilianManagementSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { PovertyCivilianChartComponent } from 'app/shared/chart/poverty-civilian-chart/poverty-civilian-chart.component';

@NgModule({
  imports: [CivilianManagementSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    PovertyCivilianChartComponent
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    CivilianManagementSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    PovertyCivilianChartComponent
  ]
})
export class CivilianManagementSharedModule {}
