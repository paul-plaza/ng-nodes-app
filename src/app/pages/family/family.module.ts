import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyComponent } from './family.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { FamilyService } from 'src/app/services/family/family.service';
import { HttpFactoryService } from 'src/app/shared/http-base-service';
import { CardNodeComponent } from 'src/app/components/card-node/card-node.component';
import { DialogAppModule } from 'src/app/shared/components/dialog/dialog.module';
import { MatIconModule } from '@angular/material/icon';


export const routes: Routes = [
  { path: 'home', component: FamilyComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    FamilyComponent,
    CardNodeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxGraphModule,
    NgSelectModule,
    FormsModule,
    FlexModule,
    DialogAppModule,
    MatIconModule
  ],
  providers: [
    HttpFactoryService,
    FamilyService,
  ]
})
export class FamilyModule { }
