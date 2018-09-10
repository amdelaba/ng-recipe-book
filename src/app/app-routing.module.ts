import { NgModule } from "@angular/core";

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
    { path: '',  component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}, //lazy loading
    { path: 'shopping-list', component: ShoppingListComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,           //only use forRoot in rootmodule, otherwise use forChild
         {preloadingStrategy: PreloadAllModules})],     // Preloads all lazy loaded modules (eg RecipesModule), optional
    exports: [RouterModule]
})

export class AppRoutingModule {

}