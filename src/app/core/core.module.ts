import { LoggingInterceptor } from './../shared/logging.interceptor';
import { AuthInterceptor } from './../shared/auth.interceptor';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        ShoppingListService, 
        RecipeService, 
        DataStorageService, 
        AuthService, 
        
        // The order in which the Interceptors are listed is the order of execution
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},   
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    ]
})
export class CoreModule {}