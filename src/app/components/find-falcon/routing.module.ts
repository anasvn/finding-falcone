import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindFalconComponent } from './find-falcon.component';



const routes: Routes = [
    {
        path: '',
        component: FindFalconComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FindFalconRoutingModule { }
