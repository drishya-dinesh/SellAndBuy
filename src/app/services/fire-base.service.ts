import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(private firestore: AngularFirestore) { }

  fetchAllAds(collectionName: string) {
    return this.firestore.collection(collectionName).get().pipe(
      map((snapshot: any) => {
        let items: any = [];
        snapshot.docs.map((a: any) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...data })
        })
        return items
      }),
    )
  }

  addToCollection(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }

  fetchMyAds(collectionName: string, sellerId: string) {
    return this.firestore.collection(collectionName, ref => ref.where('sellerId', '==', sellerId)).get().pipe(
      map((snapshot: any) => {
        let items: any = [];
        snapshot.docs.map((a: any) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...data })
        })
        return items
      }),
    )
  }

  fetchSavedAds(collectionName: string, sellerId: string) {
    return this.firestore.collection(collectionName, ref => ref.where('savedUsers', 'array-contains', sellerId)).get().pipe(
      map((snapshot: any) => {
        let items: any = [];
        snapshot.docs.map((a: any) => {
          const data = a.data();
          const id = a.id;
          items.push({ id, ...data })
        })
        return items
      }),
    )
  }

  saveAd(collectionName: string, adId: string, savedUsers: any) {
    return this.firestore.collection(collectionName).doc(adId).update({ savedUsers: savedUsers });
  }

}
