import {  Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipeListUpdated = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();  // slice returns a new array
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeListUpdated.next(this.recipes.slice());
  }

  updateRecipe (index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeListUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeListUpdated.next(this.recipes.slice());
  }
  
  setRecipes(fetchedRecipes:Recipe[]){
    this.recipes = fetchedRecipes;
    this.recipeListUpdated.next(this.recipes.slice());
  }

// Functionality moved to DataStorageService
  // saveRecipes() {
  //   return this.http.put('https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json',
  //     this.recipes);  
  // }

  // fetchRecipes(){
  //   return this.http.get('https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json');
  // }

}
