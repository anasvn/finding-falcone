import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PlanetComponent } from '../planet/planet.component';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { FindFalconComponent } from './find-falcon.component';
import { FindFalconRoutingModule } from './routing.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FindFalconRoutingModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [
        FindFalconComponent,
        PlanetComponent,
        VehicleComponent
    ]
})
export class FindFalconModule { }
