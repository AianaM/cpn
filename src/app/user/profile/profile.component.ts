import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../user.service';
import {switchMap, tap} from 'rxjs/operators';
import {Phone, TeamCard, User} from '../user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: User;
    editProfile: User;
    auth = this.userService.currentUser$;

    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.userService.getUser(params.get('id')))
        ).subscribe(user => this.user = user);
    }

    editProfileToggle() {
        if (!this.editProfile) {
            this.editProfile = this.user;
            if (!this.editProfile.name.phone || !this.editProfile.name.phone.length) {
                this.editProfile.name.phone = [new Phone()];
            }
            if (!this.editProfile.teamCard) {
                this.editProfile.teamCard = new TeamCard(this.editProfile.photo);
            }
            return;
        }
        this.editProfile = null;
        return;
    }

    uploadAvatar(event) {
        if (!event.target.files.length) {
            return;
        }
        this.editProfile.photo = {
            links: {
                squared_thumbnail_64: window.URL.createObjectURL(event.target.files[0])
            },
            file: event.target.files[0]
        };
    }

    uploadPhoto(event) {
        if (!event.target.files.length) {
            return;
        }
        this.editProfile.teamCard.photo = {
            links: {
                squared_thumbnail_64: window.URL.createObjectURL(event.target.files[0])
            },
            file: event.target.files[0]
        };
    }

    onSubmit() {
        this.userService.saveUser(this.editProfile);
        this.editProfile = null;
    }

}
