import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultComponent } from './result.component';
import { ResultRoutingModule } from './routing.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ResultRoutingModule
    ],
    declarations: [ResultComponent]
})
export class ResultModule { }
