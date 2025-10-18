import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    show() {
        this.loadingSubject.next(true);
    }

    hide() {
        this.loadingSubject.next(false);
    }

    get loading$(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }
}
