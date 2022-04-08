import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}
