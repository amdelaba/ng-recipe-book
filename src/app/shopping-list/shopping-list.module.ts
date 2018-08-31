import { FormsModule } from '@angular/forms';
import { NgModule } from "../../../node_modules/@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { CommonModule } from "../../../node_modules/@angular/common";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]

})
export class ShoppingListModule{

}