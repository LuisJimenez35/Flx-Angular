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

  constructor(
    private firebaseService: GenericFirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.users$ = this.firebaseService.GetAllDocumentsWithIds('test1-Userinformation');
  }

    async deleteUser(user: any): Promise<void> {
        console.log('User:', user);
        console.log('Deleting user:', user);
        try {
            const uid = await this.authService.findUidByEmail(user.email);
            console.log('UID found in Authentication:', uid);
            if (uid) {
                await this.authService.deleteUser(uid);
                console.log('User deleted from Firebase Authentication:', uid);
            } else {
                console.error('UID is undefined.');
                return;
            }
        } catch (error: any) {
            console.error('Error deleting user from Firebase Authentication:', error.message); // Imprimimos el mensaje de error completo
            return;
        }

        try {
        await this.firebaseService.DeleteDocument('test1-Userinformation', user.id);
        console.log('Document deleted from Firestore:', user.id);
        } catch (error) {
        console.error('Error deleting document from Firestore:', error);
        }
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

