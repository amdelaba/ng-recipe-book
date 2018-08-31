import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { HttpEvent } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    public authService: AuthService){}

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      // (response: Response) => {
      //   console.log(response);
      // }
      (response: HttpEvent<any>) => {
        console.log(response);
      }
    );
    // this.recipeService.saveRecipes().subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );

    // this.slService.saveShoppingList().subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
    // this.recipeService.fetchRecipes().subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.recipeService.overwriteRecipes(response.json())
    //   },
    //   (error) => console.log(error)
    // );

    // this.slService.fetchShoppingList().subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.slService.overwriteIngredients(response.json())
    //   },
    //   (error) => console.log(error)
    // );
  }

  onLogout(){
    this.authService.logout();
  }
}
