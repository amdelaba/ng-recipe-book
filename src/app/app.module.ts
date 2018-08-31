import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

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
    CoreModule
  ],
  providers: [], //moved all providers to core module
  bootstrap: [AppComponent]
})
export class AppModule { }
