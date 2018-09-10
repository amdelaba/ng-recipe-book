import  * as RecipeActions  from './../store/recipes.actions';
import * as fromRecipe from './../store/recipes.reducers';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions  from './../../shopping-list/store/shopping-list.actions';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    )
  }

  onAddToShoppingList() {


    // By using take(1) an Observable immediately completes after the first emitted value,
    //  which means you don't need to unsubscribe in order to prevent memory leaks.
    
    this.store.select('recipes')
      .take(1)
      .subscribe( 
          (recipeState: fromRecipe.State) => {
            this.store.dispatch(new ShoppingListActions.AddIngredients(
              recipeState.recipes[this.id].ingredients)
            );
          }
      );

  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); // alternative
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
