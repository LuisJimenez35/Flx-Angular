// register.component.ts
import { Component, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa ReactiveFormsModule

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../shared/components/error-modal/error-modal.component';
import { AuthService } from '../../services/Firebase/Auth/auth.service';
import { GenericFirebaseService } from '../../services/Firebase/FirestoreDB/generic-firebase.service';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInfoInterface } from '../../models/user.interface';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],

})
export class RegisterComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    authService = inject(AuthService);
    router = inject(Router);
    genericService = inject(GenericFirebaseService);

    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],

    });

    constructor(private modalService: NgbModal) {}

    onSubmit(): void {
        const rawForm = this.form.getRawValue();
        this.authService
            .register(rawForm.email, rawForm.password, rawForm.username)
            .subscribe({
                next: (userId) => {
                    let userData: UserInfoInterface = {
                        username: rawForm.username,

                        email: rawForm.email,
                        rol: 'user',
                    };

                    // Utiliza el UID de autenticación como ID del documento
                    this.genericService.AddDocument('test1-Userinformation', userId, userData);
                    this.router.navigateByUrl('/login');
                },
                error: (err) => {
                    this.openErrorModal(err.code);
                },
            });
    }

    openErrorModal(errorMessage: string): void {
        const modalRef = this.modalService.open(ErrorModalComponent);
        modalRef.componentInstance.errorMessage = errorMessage;
    }
}

@NgModule({
    declarations: [
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule, // Importa ReactiveFormsModule aquí
        RouterModule,
    ],
    providers: [
        NgbModal,
        FormBuilder,
        HttpClient,
        AuthService,
        GenericFirebaseService,
    ],
})
export class RegisterModule {}
