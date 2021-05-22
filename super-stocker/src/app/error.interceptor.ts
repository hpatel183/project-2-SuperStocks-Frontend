import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorIntercept implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        switch(error.error.message) {
                            case "Stock does not exist.":
                                errorMessage = error.url.split("stock/")[1];
                                break;
                            default:
                                errorMessage = `Error Status: ${error.status}\nMessage: ${error.error.message}`;
                                alert(errorMessage);
                                break;
                                
                        }
                    }
                    console.log(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}