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
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [], //moved all providers to core module
  bootstrap: [AppComponent]
})
export class AppModule { }

