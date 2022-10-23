import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoFoundComponent } from './pages/no-found/no-found.component';
import { ContainerComponent } from './shared/components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/family/family.module').then(m => m.FamilyModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/configuration/configuration.module').then(m => m.ConfigurationModule)
      }
    ],
  },
  { path: '**', component: NoFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
