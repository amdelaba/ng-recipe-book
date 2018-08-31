import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpParams, HttpRequest } from "../../../node_modules/@angular/common/http";

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService){}

    storeRecipes() {
        const token = this.authService.getToken();

        // return this.httpClient.put('https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json', 
        //     this.recipeService.getRecipes(), {
        //         observe: 'body', // body is default, not needed. You can also observer events
        //         // headers: new HttpHeaders()....  // 
        //         params: new HttpParams().set('auth', token)   // query parameters, replaces ...?auth+token in url
        // });
    

        // Alternative way
        // const req = new HttpRequest('PUT', 'https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json', 
            // this.recipeService.getRecipes(), 
            // { reportProgress: true, params: new HttpParams().set('auth', token) } );
      
        // Alternative way, Interceptor adding the auth header
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json', 
            this.recipeService.getRecipes(), { reportProgress: true } );

        return this.httpClient.request(req);  // still returns observable
    
    }

    getRecipes() {

        const token = this.authService.getToken();

        // Can only define generics type (ie <Recipe[]>) if response is json
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-5b1d6.firebaseio.com/recipes.json?auth=' + token)
        .map(
            (recipes) => {
                // make sure ingredients array is always present even if empty
                for (let recipe of recipes){
                    if (!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }     
                return recipes;           
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        )
    }

}