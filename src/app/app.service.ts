import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _loader = new BehaviorSubject<number>(0);
    loaderState$ = this._loader.asObservable();

    private _sideOpened = new BehaviorSubject<boolean>(false);
    readonly sideOpened$ = this._sideOpened.asObservable();

    constructor(private snackBar: MatSnackBar) {
    }

    openSnackBar(message: string, action?: string, duration?: number) {
        return this.snackBar.open(message, action, {
            duration: duration || 2000,
        });
    }

    setLoad(loading: boolean) {
        let value = this._loader.value;
        loading ? value++ : value--;
        this._loader.next(value);
    }

    set sideOpened(opened: boolean) {
        this._sideOpened.next(opened);
    }
}
