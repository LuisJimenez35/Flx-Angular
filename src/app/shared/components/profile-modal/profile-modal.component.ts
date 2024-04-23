// profile-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInterface } from '../../../models/user.interface';

@Component({
    selector: 'app-profile-modal',
    templateUrl: './profile-modal.component.html',
    styleUrls: ['./profile-modal.component.css'],
})
export class ProfileModalComponent implements OnInit {
    constructor(public activeModal: NgbActiveModal) {}

    @Input() user: UserInterface | undefined;

    ngOnInit(): void {
        console.log("User data:", this.user);
    }
}
