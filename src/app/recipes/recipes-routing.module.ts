import { NgModule } from "../../../node_modules/@angular/core";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { AuthGuard } from "../auth/auth-guard.service";

const recipesRoutes: Routes = [
    // { path: 'recipes', component: RecipesComponent, children: [  //modified below for lazy loading
    { path: '', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent, canActivate:[AuthGuard]  },   // paths with no variables should go first (i.e. id) 
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate:[AuthGuard] }
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)      //only use forRoot in rootmodule, otherwise use forChild
    ],
    exports: [RouterModule],
    providers: [AuthGuard]  //Guards are only services that should be provided in the routing modules
})
export class RecipeRoutingModule{}