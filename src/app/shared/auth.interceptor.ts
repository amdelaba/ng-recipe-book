import * as fromAuth from './../auth/store/auth.reducers';
import * as fromApp from './../store/app.reducers';
import { Store } from '@ngrx/store';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted! ', req);

        // switchMap: insteaf of map, to avoid double wrapping in Observables
        // take(1): only get this value once, as opposed to continous subscription
        return this.store.select('auth').take(1).switchMap(
            (authState: fromAuth.State) =>{
                const copiedReq = req.clone({params: req.params.set('auth', authState.token )});
                return next.handle(copiedReq);
            }  
        )
    }
}