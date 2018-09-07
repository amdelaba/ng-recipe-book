import * as fromAuth from './store/auth.reducers';
import * as fromApp from './../store/app.reducers';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { auth } from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>){}

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return  this.store.select('auth').map((authState: fromAuth.State) => {
            return authState.authenticated;
        });
    }

}