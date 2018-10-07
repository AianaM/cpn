import {Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {tap, filter} from 'rxjs/operators';
import {User} from '../user/user';
import {AuthService} from '../user/auth.service';

@Directive({
    selector: '[appIfRole]'
})
export class IfRoleDirective implements OnInit, OnDestroy {

    user$: Subscription;
    @Input() appIfRole: string | string[];

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private authService: AuthService) {
    }

    ngOnInit() {
        const roles = typeof this.appIfRole === 'string' ? [this.appIfRole] : this.appIfRole;
        this.user$ = this.authService.currentUser$.pipe(
            tap(() => this.viewContainer.clear()),
            filter((user: User) => {
                if (!user || !user.roles) {
                    return false;
                }
                for (const iterator of roles) {
                    if (user.roles.includes(iterator)) {
                        return true;
                    }
                }

            })
        ).subscribe(() => this.viewContainer.createEmbeddedView(this.templateRef));
    }

    ngOnDestroy() {
        if (this.user$) {
            this.user$.unsubscribe();
        }
    }
}
