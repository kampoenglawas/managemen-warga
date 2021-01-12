import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CivilianManagementSharedModule } from 'app/shared/shared.module';
import { CivilianManagementCoreModule } from 'app/core/core.module';
import { CivilianManagementAppRoutingModule } from './app-routing.module';
import { CivilianManagementHomeModule } from './home/home.module';
import { CivilianManagementEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CivilianManagementSharedModule,
    CivilianManagementCoreModule,
    CivilianManagementHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CivilianManagementEntityModule,
    CivilianManagementAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class CivilianManagementAppModule {}
