import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor(private httpClient: HttpClient){}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // addIngredients(ingredients: Ingredient[]) {
  //   // for (let ingredient of ingredients) {
  //   //   this.addIngredient(ingredient);
  //   // }
  //   this.ingredients.push(...ingredients);
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
   }

   deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
   }

   overwriteIngredients(fetchedIngredients:Ingredient[]){
    this.ingredients = fetchedIngredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  saveShoppingList() {
    return this.httpClient.put('https://ng-recipe-book-5b1d6.firebaseio.com/shopping.json',
      this.ingredients);  
  }

  fetchShoppingList(){
    return this.httpClient.get('https://ng-recipe-book-5b1d6.firebaseio.com/shopping.json');
  }

}
