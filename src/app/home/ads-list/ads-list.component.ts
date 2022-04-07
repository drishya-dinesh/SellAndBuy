import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { COLLECTIONS } from '../app-constants';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss']
})
export class AdsListComponent implements OnInit {

  @Input() ads: any = [];

  userId: any = '';

  constructor(
    private fireBaseService: FireBaseService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');

  }

  openAdDetails(ad: any) {
    this.saveAd(ad);
  }

  saveAd(ad: any) {
    if (!ad?.savedUsers?.includes(this.userId)) {
      const savedUsers = ad.savedUsers || [];
      savedUsers.push(this.userId);
      this.fireBaseService.saveAd(COLLECTIONS.ALL_ADS, ad.id, savedUsers).then(() => {
        this.message.create('success', 'Ad Saved Successfully');
      })
    }
  }
}
