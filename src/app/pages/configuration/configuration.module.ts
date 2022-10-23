import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { FamilyService } from 'src/app/services/family/family.service';
import { HttpFactoryService } from 'src/app/shared/http-base-service';
import { DialogAppModule } from 'src/app/shared/components/dialog/dialog.module';
import { ConfigurationComponent } from './configuration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Routes = [
  { path: 'configuration', component: ConfigurationComponent },
  { path: '', redirectTo: 'configuration', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    FlexModule,
    MatButtonModule,
    DialogAppModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HttpFactoryService,
    FamilyService,
  ]
})
export class ConfigurationModule { }
