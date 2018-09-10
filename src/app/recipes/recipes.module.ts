import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { ReactiveFormsModule } from "../../../node_modules/@angular/forms";
import { CommonModule } from "../../../node_modules/@angular/common";
import { RecipesComponent } from "./recipes.component";
import { RecipeRoutingModule } from "./recipes-routing.module";
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './store/recipes.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipesEffects } from './store/recipes.effects';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
    ],
    imports: [
        CommonModule, //Use CommonModule in feature modules, not BrowserModule (includes common directives)
        ReactiveFormsModule,
        RecipeRoutingModule,
        SharedModule,

        // tells ngrx to add this reducer and state to the global app state once 
        // the lazily loaded module has been added to the app
        StoreModule.forFeature('recipes', recipeReducer),  // forFeatures(name of feature, feature reducer)
        EffectsModule.forFeature([RecipesEffects])


    ]

})
export class RecipesModule {}