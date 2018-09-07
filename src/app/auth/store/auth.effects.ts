import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';


// Effects do somthing that depend on actions being dispatched
// but does not change the store

@Injectable()
export class AuthEffects {


    // TODO: React accordingly to login/signup errors (maybe add new action, FAILED_LOGIN ??)


    // Following observable operatiors will only get executed if action of type TRY_SIGNUP is dispatched 
    // anywhere in the application

    //@Effect decotator expects an Observable

    // A the end an Effect you typically dispacts a action(s)



    @Effect()
    authSignup = this.actions$.ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => {
            return action.payload;
        })
        // fromPromise: Turns promise into Observable
        .switchMap((authData: {email: string, password:string}) => {
            return fromPromise(firebase.auth()
                .createUserWithEmailAndPassword(authData.email, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        // mergeMap(): returns the result of two Observables (in this case, it returns two new actions which are dispatched)
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    

    @Effect()
    authSignin = this.actions$.ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => {
            return action.payload;
        })
        .switchMap((authData: {email: string, password:string}) => {
            return fromPromise(firebase.auth()
                .signInWithEmailAndPassword(authData.email, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });


    // dispatch: false, means that an action is not dispatched at the end

    // .do(): you can generate some side effects without changing the Observable 
    // (and make it very clear to the reader that it has not changed).

    @Effect({dispatch: false})
    authLogout = this.actions$.ofType(AuthActions.LOGOUT)
        .do( () => {
            this.router.navigate(['/']);
        });
    

    // $: used to signal that it is an observable
    constructor(private actions$: Actions,
    private router: Router ) {}
}