import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import 'rxjs/add/operator/do';


export class LoggingInterceptor implements HttpInterceptor {
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // With do, we handle the request after it has been sent
        return next.handle(req).do(   //do: allows us to exceute code without consuming the data
            event => {
                console.log('Logging Interceptor', event);  // also logs the sent event: type:0
            }
        )
    }

}