import { DropdownDirective } from './dropdown.directive';
import { NgModule } from "../../../node_modules/@angular/core";
import { CommonModule } from '../../../node_modules/@angular/common';

@NgModule({
    declarations:[
        DropdownDirective
    ], 
    exports: [
        CommonModule,
        DropdownDirective
    ]
})
export class SharedModule {

}