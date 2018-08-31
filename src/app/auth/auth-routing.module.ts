import { NgModule } from "../../../node_modules/@angular/core";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

const authRoutes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
]
@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)      //only use forRoot in rootmodule, otherwise use forChild
    ],
    exports: [RouterModule]
 })
export class AuthRoutingModule{}