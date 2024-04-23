import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, DocumentReference, doc, docData, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GenericFirebaseService {
    constructor(private firestore: Firestore) {}

    GetAllDocuments(collectionName: string) {
        const collectionRef = collection(this.firestore, collectionName);
        return collectionData(collectionRef) as Observable<any[]>;
    }

    GetAllDocumentsWithIds(collectionName: string) {
        const collectionRef = collection(this.firestore, collectionName);
        const querySnapshot = collectionData(collectionRef, { idField: 'id' });
        return querySnapshot as Observable<any[]>;
    }

    GetOneDocument(collectionName: string, documentId: any) {
        const documentRef = doc(this.firestore, collectionName, documentId);
        return docData(documentRef) as Observable<any>;
    }

    AddDocument(collectionName: string, documentId: string, data: any): Promise<void> {
        const documentRef = doc(this.firestore, collectionName, documentId);
        return setDoc(documentRef, data)
            .then(() => {}) 
            .catch((err) => {
                throw err;
            });
    }

    UpdateDocument(collectionName: string, documentId: any, data: any) {
        const documentRef = doc(this.firestore, collectionName, documentId);
        return updateDoc(documentRef, data);
    }

    DeleteDocument(collectionName: string, documentId: any) {
        const documentRef = doc(this.firestore, collectionName, documentId);
        return deleteDoc(documentRef);
    }
}
