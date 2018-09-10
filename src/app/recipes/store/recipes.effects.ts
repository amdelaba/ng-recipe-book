import * as RecipeActions  from './recipes.actions';
import { Effect, Actions } from "@ngrx/effects";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipes.reducers';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class RecipesEffects {

    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>(
                'https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json')
        })
        .map(
            (recipes) => {
                // make sure ingredients array is always present even if empty
                for (let recipe of recipes){
                    if (!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }     
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };          
            }
        );
       

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {

            const req = new HttpRequest('PUT', 'https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json', 
                state.recipes, { reportProgress: true } );

            return this.httpClient.request(req);  // still returns observable

        });
        

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>) {}
}