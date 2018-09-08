import { AuthEffects } from './auth/store/auth.effects';
import { reducers } from './store/app.reducers';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,   //Use BrowserModule in appmodule (contains all features in CommonModule plus more)
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    AuthModule, 
    CoreModule,

    // Ngrx related modules
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    
    // Only want StoreDevtoolsModule if not in production
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [], //moved all providers to core module
  bootstrap: [AppComponent]
})
export class AppModule { }

