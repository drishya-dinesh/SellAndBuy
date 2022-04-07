import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NewAd } from '../home/newAd.model';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  constructor(private fireService: AngularFirestore) {}

  onPostAd(newAd: NewAd) {
    newAd.id = this.fireService.createId();
    return this.fireService.collection('/MyAds').add(newAd);
  }
  getAllAds() {
    return this.fireService.collection('./MyAds').snapshotChanges();
  }
}
