import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { GenericFirebaseService } from '../../services/Firebase/FirestoreDB/generic-firebase.service';
import { AuthService } from '../../services/Firebase/Auth/auth.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-adminwindow',
  templateUrl: './adminwindow.component.html',
  styleUrls: ['./adminwindow.component.css']
})
export class AdminwindowComponent implements OnInit {
openEditModal(_t90: any) {
throw new Error('Method not implemented.');
}
  users$: Observable<any[]> | undefined;
  newUser: any={};
  selectedUser: any={};

  constructor(
    private firebaseService: GenericFirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.users$ = this.firebaseService.GetAllDocumentsWithIds('test1-Userinformation');
  }


    addUser(addUserForm: any): void {
        if (addUserForm.valid) {
            this.authService.register(this.newUser.email, this.newUser.password, this.newUser.username)
            .subscribe({
                next: (userId) => {
                    this.firebaseService.AddDocument('test1-Userinformation', userId, {
                        username: this.newUser.username,
                        email: this.newUser.email,
                        rol: 'user',
                    }).then(() => {
                        addUserForm.reset();
                        this.newUser = {};
                        document.getElementById('addUserModal')?.classList.remove('show');
                        document.querySelector('.modal-backdrop')?.remove();
                    }).catch((error) => {
                        console.error('Error adding user to Firestore:', error);
                    });
                },
                error: (error) => {
                    console.error('Error registering user:', error);
                }
            });
        }
    }

    updateUser(updateUserForm: any): void {
        if (updateUserForm.valid) {
            this.firebaseService.UpdateDocument('test1-Userinformation', this.selectedUser.id, {
                username: this.selectedUser.username,
                email: this.selectedUser.email,
                rol: this.selectedUser.rol,
            }).then(() => {
                updateUserForm.reset();
                this.selectedUser = {};
                document.getElementById('editUserModal')?.classList.remove('show');
                document.querySelector('.modal-backdrop')?.remove();
            }).catch((error) => {
                console.error('Error updating user in Firestore:', error);
            });
        }
    }

}

@NgModule({
  declarations: [
    AdminwindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminwindowModule { }

