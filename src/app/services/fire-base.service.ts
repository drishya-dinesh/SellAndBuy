import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  constructor(private firestore: AngularFirestore) {}

  fetchAllAds(collectionName: string) {
    return this.firestore
      .collection(collectionName)
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            items.push({ id, ...data });
          });
          return items;
        })
      );
  }

  postAd(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }

  updateAd(collectionName: string,adId:string, data: any){
       return this.firestore
      .collection(collectionName)
      .doc(adId)
      .update(data);
  }

  fetchMyAds(collectionName: string, userId: string) {
    return this.firestore
      .collection(collectionName, (ref) => ref.where('sellerId', '==', userId))
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push(data);
          });
          return items;
        })
      );
  }

  fetchSavedAds(collectionName: string, userId: string) {
    return this.firestore
      .collection(collectionName, (ref) =>
        ref.where('savedUsers', 'array-contains', userId)
      )
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push(data);
          });
          return items;
        })
      );
  }

  saveAd(collectionName: string, adId: string, savedUsers: any) {
    return this.firestore
      .collection(collectionName)
      .doc(adId)
      .update({ savedUsers: savedUsers });
  }

  deleteAd(collectionName: string, adId: string) {
    return this.firestore.collection(collectionName).doc(adId).delete();
  }

  addUsers(collectionName: string, user: any) {
    return this.firestore.collection(collectionName).add(user);
  }

  checkEmailExists(collectionName: string, email: string) {
    return this.firestore
      .collection(collectionName, (ref) => ref.where('email', '==', email))
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push(data);
          });
          return items;
        })
      );
  }

  checkUserExists(collectionName: string, user: any) {
    return this.firestore
      .collection(collectionName, (ref) =>
        ref
          .where('email', '==', user.email)
          .where('password', '==', user.password)
      )
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push(data);
          });
          return items;
        })
      );
  }

  allChats(collectionName: string, id: string, key: string) {
    return this.firestore
      .collection(collectionName, (ref) => ref.where(key, '==', id))
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push(data);
          });
          return items;
        })
      );
  }

  checkChatExists(collectionName: string, ad: any, userId: string) {
    return this.firestore
      .collection(collectionName, (ref) =>
        ref.where('adId', '==', ad.id).where('buyerId', '==', userId)
      )
      .get()
      .pipe(
        map((snapshot: any) => {
          let items: any = [];
          snapshot.docs.map((a: any) => {
            const data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push(data);
          });
          return items;
        })
      );
  }

  startChat(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }

  sendMessage(collectionName: string, chatId: any, chats: any) {
    return this.firestore
      .collection(collectionName)
      .doc(chatId)
      .update({ chats: chats });
  }
}
