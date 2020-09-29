import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule) },
  { path: 'result', loadChildren: () => import('./components/result/result.module').then((m) => m.ResultModule) },
  { path: 'find-falcon', loadChildren: () => import('./components/find-falcon/find-falcon.module').then((m) => m.FindFalconModule) },
  { path: '**', loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
