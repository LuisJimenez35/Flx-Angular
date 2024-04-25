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

  users$: Observable<any[]> | undefined;
  newUser: any={};
  selectedUser: any={};
  selectedUserToDelete: any;

  constructor(
    private firebaseService: GenericFirebaseService,
    private authService: AuthService
  ) {}

  //View all users
  ngOnInit(): void {
    this.users$ = this.firebaseService.GetAllDocumentsWithIds('test1-Userinformation');
  }

    openEditModal(user: any): void {
        this.selectedUser = user;
    }

    //Create user
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

    //Update user
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

    prepareDeleteUser(user: any): void {
        this.selectedUserToDelete = user;
    }

    //Delete user
    deleteUser():void{
        if (this.selectedUserToDelete) {
            const userId = this.selectedUserToDelete.id; // Paso 1
            this.firebaseService.DeleteDocument('test1-Userinformation', userId) // Paso 2
                .then(() => {
                    // Obtener el UID del usuario a eliminar
                    this.authService.findUidByEmail(this.selectedUserToDelete.email)
                        .then((uid) => {
                            if (uid) {
                                this.authService.deleteUser(uid) // Paso 3
                                    .then(() => {
                                        // Eliminación exitosa
                                        console.log('User deleted successfully.');
                                    })
                                    .catch((error) => {
                                        console.error('Error deleting user from Firebase Authentication:', error);
                                    });
                            } else {
                                console.error('UID not found for the user:', this.selectedUserToDelete.email);
                            }
                        })
                        .catch((error) => {
                            console.error('Error finding UID for the user:', this.selectedUserToDelete.email, error);
                        });
                })
                .catch((error) => {
                    console.error('Error deleting user from Firestore:', error);
                });
        } else {
            console.error('No user selected for deletion.');
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

