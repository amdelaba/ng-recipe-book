import { AuthService } from 'src/app/auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted! ', req);

        // const copiedReq = req.clone({headers: req.headers.append()});
        const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});

        return next.handle(copiedReq);
    }
}