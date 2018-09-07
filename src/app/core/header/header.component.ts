import { Observable } from 'rxjs/Observable';
import * as fromApp from './../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent } from '../../../../node_modules/@angular/common/http';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  authState:Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
    public authService: AuthService,
    private store: Store<fromApp.AppState>){}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
       (response: HttpEvent<any>) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}
