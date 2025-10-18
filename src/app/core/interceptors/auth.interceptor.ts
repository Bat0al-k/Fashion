import { inject, Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private router = inject(Router);
    private toastr = inject(ToastrService);
    private loader = inject(LoaderService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loader.show();

        const token = localStorage.getItem('token');
        const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

        return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
            this.toastr.warning(' must sign up');
            this.router.navigate(['/auth/login']);
            } else if (error.status === 403) {
            this.toastr.error('you have not permission');
            } else if (error.status === 500) {
            this.toastr.error('server error try later');
            } else if (error.status === 0) {
            this.toastr.error('can not connect with server');
            } else {
            this.toastr.error(error.error?.message || 'some error happened');
            }

            return throwError(() => error);
        }),
        finalize(() => this.loader.hide())
        );
    }
}
